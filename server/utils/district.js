const DISTRICT = {
  CNO: {
    KOR_NAME: '종로구',
  },
  CGS: {
    KOR_NAME: '중구',
  },
  YSN: {
    KOR_NAME: '용산구',
  },
  SDG: {
    KOR_NAME: '성동구',
  },
  KJI: {
    KOR_NAME: '광진구',
  },
  TDM: {
    KOR_NAME: '동대문구',
  },
  CNG: {
    KOR_NAME: '중랑구',
  },
  SBK: {
    KOR_NAME: '성북구',
  },
  KBK: {
    KOR_NAME: '강북구',
  },
  TBG: {
    KOR_NAME: '도봉구',
  },
  NWN: {
    KOR_NAME: '노원구',
  },
  UPG: {
    KOR_NAME: '은평구',
  },
  SDM: {
    KOR_NAME: '서대문구',
  },
  MPO: {
    KOR_NAME: '마포구',
  },
  YGC: {
    KOR_NAME: '양천구',
  },
  KSS: {
    KOR_NAME: '강서구',
  },
  KRO: {
    KOR_NAME: '구로구',
  },
  KCN: {
    KOR_NAME: '금천구',
  },
  YDP: {
    KOR_NAME: '영등포구',
  },
  TJK: {
    KOR_NAME: '동작구',
  },
  KNK: {
    KOR_NAME: '관악구',
  },
  SCO: {
    KOR_NAME: '서초구',
  },
  KNM: {
    KOR_NAME: '강남구',
  },
  SPA: {
    KOR_NAME: '송파구',
  },
  KDG: {
    KOR_NAME: '강동구',
  },
};

const convertDistrictCode = (code) => DISTRICT[code].KOR_NAME;

module.exports = convertDistrictCode;
