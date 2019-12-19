const ERROR_MSG = {
  NO_BODY: 'No body in request!',
  NO_PAYLOAD_LIST: 'No payload list. You must add payload list!',
  NO_ARRAY_PAYLOAD_LIST_TYPE: 'Payload list type not Array',
  NOT_MATCH_PAYLOAD: 'Not match payload in body',
  OCCUR_UNKNOWN_ERROR: 'Occur unknown error...',
};

const bodyChecker = (req, res, next) => {
  const body = req.body;
  if (!body) {
    res.status(400).json({ success: false, errorMsg: ERROR_MSG.NO_BODY });
  }
  try {
    const payloadList = body.payloadList;
    if (!payloadList) {
      res.status(400).json({
        success: false,
        errorMsg: ERROR_MSG.NO_PAYLOAD_LIST,
      });
    }
    if (!Array.isArray(payloadList)) {
      res.status(400).json({
        success: false,
        errorMsg: ERROR_MSG.NO_ARRAY_PAYLOAD_LIST_TYPE,
      });
    }
    payloadList.forEach((payload) => {
      if (!body[payload]) {
        res.status(400).json({
          success: false,
          errorMsg: ERROR_MSG.NOT_MATCH_PAYLOAD,
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      errorMsg: ERROR_MSG.OCCUR_UNKNOWN_ERROR,
    });
  }
  next();
};

module.exports = bodyChecker;
