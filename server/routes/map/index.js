const express = require('express');
const map = express.Router();

const { getDistrictInfo } = require('./controller');

map.get('/', getDistrictInfo);

module.exports = map;
