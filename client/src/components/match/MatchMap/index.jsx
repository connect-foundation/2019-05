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
    const seoulCoordinate = new loadedMap.LatLngBounds(
      new loadedMap.LatLng(37.426999, 126.764166),
      new loadedMap.LatLng(37.703238, 127.179192)
    );
    const naverMap = new loadedMap.Map('naver-map', {
      useStyleMap: true,
      zoom: 11,
      minZoom: 11,
      maxZoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        style: loadedMap.ZoomControlStyle.SMALL,
      },
      center: new loadedMap.LatLng(37.553738, 126.986409),
      maxBounds: seoulCoordinate,
      mapTypes: new loadedMap.MapTypeRegistry({
        normal: loadedMap.NaverStyleMapTypeOption.getVectorMap(),
        label: loadedMap.NaverStyleMapTypeOption.getNormalMap(),
      }),
    });
    const naverMapStyleConfigObj = {
      fillColor: '#000000',
      fillOpacity: 0,
      strokeColor: '#000000',
      strokeWeight: 2,
      strokeOpacity: 1,
      clickable: true,
    };

    window.naver.maps.Event.addListener(naverMap, 'zoom_changed', (zoom) => {
      const label = new loadedMap.Layer('label', naverMap.mapTypes.label);
      const normal = new loadedMap.Layer('normal', naverMap.mapTypes.normal);
      if (zoom >= 13) {
        label.setMap(naverMap);
        naverMapStyleConfigObj.clickable = false;
        naverMap.data.setStyle(naverMapStyleConfigObj);
        return;
      }
      normal.setMap(naverMap);
      naverMapStyleConfigObj.clickable = true;
      naverMap.data.setStyle(naverMapStyleConfigObj);
    });

    const seoulDistricts = await loadSeoulDistrict();
    seoulDistricts.forEach((district) => {
      naverMap.data.addGeoJson(district);
      naverMap.data.setStyle(naverMapStyleConfigObj);
    });

    naverMap.data.addListener('mouseover', (e) => {
      console.log(e.feature.property_sig_kor_nm);
      naverMap.data.overrideStyle(e.feature, {
        fillOpacity: 1,
        strokeWeight: 20,
        strokeOpacity: 1,
      });
    });

    naverMap.data.addListener('mouseout', () => {
      naverMap.data.revertStyle();
    });

    naverMap.data.addListener('click', (e) => {
      const selectedDistrict = e.feature.getBounds();
      if (selectedDistrict) {
        naverMap.panToBounds(selectedDistrict);
      }
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
