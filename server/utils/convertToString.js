const convertToString = (id) => {
  return typeof id === 'number' ? id.toString() : id;
};

module.exports = convertToString;