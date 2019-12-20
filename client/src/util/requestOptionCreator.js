const post = (url, body) => {
  const payloadList = Object.keys(body).reduce((acc, key) => {
    acc.push(key);
    return acc;
  }, []);
  return {
    url,
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    data: JSON.stringify({ ...body, payloadList }),
  };
};

const get = (url) => {
  return {
    url,
    methd: 'get',
    headers: {
      'Content-type': 'application/json',
    },
  };
};

const cookie = (url, token) => {
  return {
    url,
    headers: { Authorization: token },
  };
};

export { post, get, cookie };
