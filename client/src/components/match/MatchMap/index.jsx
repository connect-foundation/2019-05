import React from 'react';
import loadJs from 'load-js';

import './index.scss';

const loadNaverMap = () => {
  const requestURL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCP_CLIENT_ID}`;
  return loadJs(requestURL).then(() => {
    const naverMap = window.naver.maps;
    if (naverMap.jsContentLoaded) {
      return naverMap;
    }
    return new Promise((resolve) => {
      naverMap.onJSContentLoaded = () => {
        resolve(naverMap);
      };
    });
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
  })();
};

const MatchMap = () => {
  showNaverMap();
  return (
    <div className="match-map">
      <div id="naver-map" />
    </div>
  );
};

export default MatchMap;
