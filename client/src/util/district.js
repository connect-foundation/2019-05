let DISTRICT = {
  CNO: {
    KOR_NAME: '종로구',
    namePosition: { x: 126.9672221, y: 37.5883778 },
    isSelected: false,
  },
  CGS: {
    KOR_NAME: '중구',
    namePosition: { x: 126.9805817, y: 37.5666103 },
    isSelected: false,
  },
  YSN: {
    KOR_NAME: '용산구',
    namePosition: { x: 126.9605354, y: 37.5383031 },
    isSelected: false,
  },
  SDG: {
    KOR_NAME: '성동구',
    namePosition: { x: 127.0216469, y: 37.5562685 },
    isSelected: false,
  },
  KJI: {
    KOR_NAME: '광진구',
    namePosition: { x: 127.0690254, y: 37.5508249 },
    isSelected: false,
  },
  TDM: {
    KOR_NAME: '동대문구',
    namePosition: { x: 127.0320798, y: 37.5889219 },
    isSelected: false,
  },
  CNG: {
    KOR_NAME: '중랑구',
    namePosition: { x: 127.0758919, y: 37.5992591 },
    isSelected: false,
  },
  SBK: {
    KOR_NAME: '성북구',
    namePosition: { x: 126.9983009, y: 37.608507 },
    isSelected: false,
  },
  KBK: {
    KOR_NAME: '강북구',
    namePosition: { x: 126.9948677, y: 37.6427686 },
    isSelected: false,
  },
  TBG: {
    KOR_NAME: '도봉구',
    namePosition: { x: 127.0161403, y: 37.6683185 },
    isSelected: false,
  },
  NWN: {
    KOR_NAME: '노원구',
    namePosition: { x: 127.0587257, y: 37.6509238 },
    isSelected: false,
  },
  UPG: {
    KOR_NAME: '은평구',
    namePosition: { x: 126.909037, y: 37.6231925 },
    isSelected: false,
  },
  SDM: {
    KOR_NAME: '서대문구',
    namePosition: { x: 126.9122767, y: 37.5807599 },
    isSelected: false,
  },
  MPO: {
    KOR_NAME: '마포구',
    namePosition: { x: 126.8843178, y: 37.5638889 },
    isSelected: false,
  },
  YGC: {
    KOR_NAME: '양천구',
    namePosition: { x: 126.8348793, y: 37.5281454 },
    isSelected: false,
  },
  KSS: {
    KOR_NAME: '강서구',
    namePosition: { x: 126.8061737, y: 37.5687873 },
    isSelected: false,
  },
  KRO: {
    KOR_NAME: '구로구',
    namePosition: { x: 126.8259529, y: 37.4990907 },
    isSelected: false,
  },
  KCN: {
    KOR_NAME: '금천구',
    namePosition: { x: 126.8816311, y: 37.466943 },
    isSelected: false,
  },
  YDP: {
    KOR_NAME: '영등포구',
    namePosition: { x: 126.8911842, y: 37.5290465 },
    isSelected: false,
  },
  TJK: {
    KOR_NAME: '동작구',
    namePosition: { x: 126.9296364, y: 37.5099851 },
    isSelected: false,
  },
  KNK: {
    KOR_NAME: '관악구',
    namePosition: { x: 126.9268898, y: 37.4723928 },
    isSelected: false,
  },
  SCO: {
    KOR_NAME: '서초구',
    namePosition: { x: 126.9886879, y: 37.4887396 },
    isSelected: false,
  },
  KNM: {
    KOR_NAME: '강남구',
    namePosition: { x: 127.0456795, y: 37.4969117 },
    isSelected: false,
  },
  SPA: {
    KOR_NAME: '송파구',
    namePosition: { x: 127.0985512, y: 37.5088957 },
    isSelected: false,
  },
  KDG: {
    KOR_NAME: '강동구',
    namePosition: { x: 127.1280769, y: 37.5589902 },
    isSelected: false,
  },
};

const setDistrict = (nextInfo) => {
  DISTRICT = { ...nextInfo };
};

const getDistrict = () => {
  return DISTRICT;
};

const convertDistrictCode = (code) => {
  return DISTRICT[code].KOR_NAME;
};

const convertDistrictName = (name) => {
  return Object.keys(DISTRICT).filter(
    (code) => DISTRICT[code].KOR_NAME === name
  )[0];
};

const findDistrictToName = (name) => {
  return Object.values(DISTRICT).filter(
    (district) => district.KOR_NAME === name
  )[0];
};

const changeDistrictInfo = (changedInfo) => {
  const code = convertDistrictName(changedInfo.KOR_NAME);
  const nextInfos = getDistrict();
  nextInfos[code] = { ...changedInfo };
  setDistrict(nextInfos);
};

const initializeDistrict = () => {
  const newDistricts = getDistrict();
  Object.values(newDistricts).forEach((district) => {
    // eslint-disable-next-line no-param-reassign
    district.isSelected = false;
  });
  setDistrict(newDistricts);
};

export {
  convertDistrictCode,
  convertDistrictName,
  setDistrict,
  getDistrict,
  findDistrictToName,
  changeDistrictInfo,
  initializeDistrict,
};
