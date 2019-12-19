const post = (url, body) => {
  return {
    url,
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    data: JSON.stringify(body),
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
