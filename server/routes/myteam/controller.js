const jwt = require('jsonwebtoken');
const { env } = process;
const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');
const Jimp = require('jimp');

const endpoint = new AWS.Endpoint(env.STORAGE_ENDPOINT);
const region = env.STORAGE_REGION;
const access_key = env.NCLOUD_API_ACCESS_KEY;
const secret_key = env.NCLOUD_API_SECRET_KEY;

AWS.config.update({
  accessKeyId: access_key,
  secretAccessKey: secret_key,
});
const S3 = new AWS.S3({
  endpoint,
  region,
});

const storage = multer.memoryStorage();
let fileUploader = multer({
  storage: storage,
  limit: {
    fileSize: 3 * 1024 * 1024,
  },
});

const imgResizer = async (file) => {
  const img = await Jimp.read(file.buffer);
  const imgW = img.getWidth();
  const imgH = img.getHeight();

  if (imgW <= 150 && imgH <= 150) return await img.getBufferAsync(Jimp.AUTO);

  const size = imgW >= imgH ? [150, Jimp.AUTO] : [Jimp.AUTO, 150];
  return await img
    .resize(size[0], size[1])
    .quality(100)
    .getBufferAsync(Jimp.AUTO);
};

const uploadEmblemImage = async (req, res) => {
  try {
    const fileExtension = path.extname(req.file.originalname);

    const imgExtRegEx = /\.(png|jpe*g)$/;
    if (!imgExtRegEx.test(fileExtension)) {
      res.status(409).json({
        result: 'error',
        msg: '파일 확장자는 jpeg, jpg, png중에 하나만 가능합니다.',
      });
      return;
    }

    const imgForUpload = await imgResizer(req.file);

    const fileName = Date.now().toString() + '-' + req.body.seq + fileExtension;

    await S3.upload({
      Bucket: env.EMBLEM_STORAGE_BUCKET_NAME,
      Key: fileName,
      Body: imgForUpload,
      ACL: 'public-read',
    }).promise();

    res.json({
      result: 'ok',
      name: fileName,
    });
  } catch (error) {
    res.json({
      result: 'error',
      msg: error,
    });
  }
};

const getPlayersTeam = async (req, res) => {
  const token = req.cookies.jwt;
  try {
    const userInfo = jwt.verify(token, env.JWT_SECRET);
    if (userInfo.team)
      res.status(200).json({ status: 200, msg: userInfo.team });
    else res.status(400).json({ status: 400, msg: '팀 좀 만들어라' });
  } catch {
    res.status(400).json({ msg: 'jwt 확인에 문제가 있습니다.' });
  }
};

module.exports = { getPlayersTeam, fileUploader, uploadEmblemImage };
