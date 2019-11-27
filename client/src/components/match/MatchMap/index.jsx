import React from 'react';
import loadJs from 'load-js';
import axios from 'axios';

import './index.scss';

const SEOUL_KOREAN = '서울';
const SEOUL_DISTRICT_CNT = '25';
const SEOUL_DISTRICT_REQUEST_URL = `/req/data?request=GetFeature&key=${process.env.REACT_APP_MAP_DISTRICT_KEY}&size=${SEOUL_DISTRICT_CNT}&data=LT_C_ADSIGG_INFO&attrfilter=full_nm:like:${SEOUL_KOREAN}&domain=${process.env.REACT_APP_DOMAIN}`;

const NAVER_MAP_API_REQUEST_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCP_CLIENT_ID}`;

const loadSeoulDistrict = async () => {
  try {
    const response = await axios.get(SEOUL_DISTRICT_REQUEST_URL);
    const seoulDistrictsFeatures =
      response.data.response.result.featureCollection.features;
    return seoulDistrictsFeatures;
  } catch (err) {
    return new Error(err);
  }
};

const loadNaverMap = () => {
  return loadJs(NAVER_MAP_API_REQUEST_URL)
    .then(() => {
      const naverMap = window.naver.maps;
      if (naverMap.jsContentLoaded) {
        return naverMap;
      }
      return new Promise((resolve) => {
        naverMap.onJSContentLoaded = () => {
          resolve(naverMap);
        };
      });
    })
    .catch((err) => {
      return new Error(err);
    });
};

const showNaverMap = () => {
  return (async () => {
    const loadedMap = await loadNaverMap();
    const naverMap = new loadedMap.Map('naver-map', {
      useStyleMap: true,
      zoom: 10,
      center: new loadedMap.LatLng(37.5666103, 126.9783882),
    });
    const seoulDistrictFeatures = await loadSeoulDistrict();
    seoulDistrictFeatures.forEach((features) => {
      naverMap.data.addGeoJson(features);
    });
  })();
};
showNaverMap();

const MatchMap = () => {
  return (
    <div className="match-map">
      <div id="naver-map" />
    </div>
  );
};

export default MatchMap;
