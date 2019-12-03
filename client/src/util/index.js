const codeMap = {
  CNO: '종로구',
  CGS: '중구',
  YSN: '용산구',
  SDG: '성동구',
  KJI: '광진구',
  TDM: '동대문구',
  CNG: '중랑구',
  SBK: '성북구',
  KBK: '강북구',
  TBG: '도봉구',
  NWN: '노원구',
  UPG: '은평구',
  SDM: '서대문구',
  MPO: '마포구',
  YGC: '양천구',
  KSS: '강서구',
  KRO: '구로구',
  KCN: '금천구',
  YDP: '영등포',
  TJK: '동작구',
  KNK: '관악구',
  SCO: '서초구',
  KNM: '강남구',
  SPA: '송파구',
  KDG: '강동구',
};

const convertDistrictCode = (code) => {
  return codeMap[code];
};

export { convertDistrictCode };
