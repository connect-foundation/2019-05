const { env } = process;
const AWS = require('aws-sdk');

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

const getDistrictInfo = async (req, res, next) => {
  await S3.getObject({
    Bucket: env.UTIL_STORAGE_BUCKET_NAME,
    Key: env.DISTRICT_INFO_FILE,
  })
    .createReadStream()
    .on('error', (error) => {
      //return res.json({ result: 'error', msg: error });
    })
    .pipe(res);
};

module.exports = { getDistrictInfo };
