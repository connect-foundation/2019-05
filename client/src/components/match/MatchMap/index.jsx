import React, { useState, useEffect } from 'react';
import loadJs from 'load-js';
import axios from 'axios';
import './index.scss';

const SEOUL = {
  KOREAN: '서울',
  DISTRICT_CNT: '25',
  SOUTH_WEST: {
    LAT: 37.426999,
    LNG: 126.764166,
  },
  NORTH_EAST: {
    LAT: 37.703238,
    LNG: 127.179192,
  },
  CENTER: {
    LAT: 37.553738,
    LNG: 126.986409,
  },
};

const NAVER_MAP_API_REQUEST_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCP_CLIENT_ID}`;

const SEOUL_DISTRICT_REQUEST_URL = `/req/data?request=GetFeature&key=${process.env.REACT_APP_MAP_DISTRICT_KEY}&size=${SEOUL.DISTRICT_CNT}&data=LT_C_ADSIGG_INFO&attrfilter=full_nm:like:${SEOUL.KOREAN}&domain=${process.env.REACT_APP_DOMAIN}`;
const SEOUL_CITY_REQUEST_URL = `/req/data?&request=GetFeature&key=${process.env.REACT_APP_MAP_DISTRICT_KEY}&data=LT_C_ADSIDO_INFO&attrfilter=ctp_kor_nm:like:${SEOUL.KOREAN}&domain={process.env.REACT_APP_DOMAIN}`;

const MatchMap = () => {
  const [naverMapData, setNaverMapData] = useState();
  const [seoulDistrictData, setSeoulDistrictData] = useState();
  const [seoulCityData, setSeoulCityData] = useState();

  // data 요청
  useEffect(() => {
    const fetchDatas = async () => {
      await loadJs(NAVER_MAP_API_REQUEST_URL);
      setNaverMapData(window.naver.maps);
      const seoulDistrictResponse = await axios(SEOUL_DISTRICT_REQUEST_URL);
      setSeoulDistrictData(
        seoulDistrictResponse.data.response.result.featureCollection.features
      );
      const seoulCityResponse = await axios(SEOUL_CITY_REQUEST_URL);
      setSeoulCityData(
        seoulCityResponse.data.response.result.featureCollection.features
      );
    };
    fetchDatas();
    return () => {
      setSeoulDistrictData(undefined);
      setNaverMapData(undefined);
      setSeoulCityData(undefined);
    };
  }, []);

  return (
    <div className="match-map">
      {naverMapData && seoulDistrictData && seoulCityData ? (
        <NaverMap
          mapData={naverMapData}
          cityData={seoulCityData}
          districtData={seoulDistrictData}
        />
      ) : (
        <span>지도 로딩중!!!!</span>
      )}
    </div>
  );
};

const NaverMap = (props) => {
  /* eslint react/prop-types: 0 */
  const { mapData, cityData, districtData } = props;
  const [naverMap, setNaverMap] = useState(undefined);

  const naverMapStyleConfigObj = {
    fillColor: '#000000',
    fillOpacity: 0,
    strokeColor: '#272A51',
    strokeOpacity: 1,
    strokeWeight: 2,
    strokeStyle: 'shortdash',
    clickable: true,
    zIndex: 1,
  };

  const handleMouseoverEvent = (e) => {
    const overrideStyleOption = { ...naverMapStyleConfigObj };
    overrideStyleOption.fillColor = '#71ACAD';
    overrideStyleOption.fillOpacity = 0.6;
    overrideStyleOption.strokeColor = '#71ACAD';
    overrideStyleOption.strokeOpacity = 0.6;
    overrideStyleOption.strokeStyle = 'solid';
    overrideStyleOption.strokeWeight = 10;
    overrideStyleOption.zIndex = 4;
    e.feature.setStyle(overrideStyleOption);
  };

  const handleMouseoutEvent = (e) => {
    e.feature.setStyle(naverMapStyleConfigObj);
  };

  const handleClickEvent = (e) => {
    const selectedDistrict = e.feature.getBounds();
    if (selectedDistrict) {
      naverMap.panToBounds(selectedDistrict);
    }
  };

  const clearEventInMap = (eventName) => {
    if (naverMap.data.hasListener(eventName)) {
      naverMap.data.clearListeners(eventName);
    }
  };

  const addEventInMap = (eventName, handler) => {
    if (!naverMap.data.hasListener(eventName)) {
      naverMap.data.addListener(eventName, handler);
    }
  };

  const handleZoomEvent = (zoom) => {
    const labelLayer = new mapData.Layer('label', naverMap.mapTypes.label);
    const normalLayer = new mapData.Layer('normal', naverMap.mapTypes.normal);
    if (zoom >= 13) {
      labelLayer.setMap(naverMap);
      clearEventInMap('mouseover');
      clearEventInMap('mouseout');
      return;
    }
    normalLayer.setMap(naverMap);
    naverMapStyleConfigObj.clickable = true;
    addEventInMap('mouseover', handleMouseoverEvent);
    addEventInMap('mouseout', handleMouseoutEvent);
  };

  useEffect(() => {
    if (naverMap === undefined) {
      const mapOptions = {
        useStyleMap: true,
        zoom: 10,
        minZoom: 10,
        maxZoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          style: mapData.ZoomControlStyle.SMALL,
        },
        center: new mapData.LatLng(SEOUL.CENTER.LAT, SEOUL.CENTER.LNG),
        maxBounds: new mapData.LatLngBounds(
          new mapData.LatLng(SEOUL.SOUTH_WEST.LAT, SEOUL.SOUTH_WEST.LNG),
          new mapData.LatLng(SEOUL.NORTH_EAST.LAT, SEOUL.NORTH_EAST.LNG)
        ),
        mapTypes: new mapData.MapTypeRegistry({
          normal: mapData.NaverStyleMapTypeOption.getVectorMap(),
          label: mapData.NaverStyleMapTypeOption.getNormalMap(),
        }),
      };
      setNaverMap(new mapData.Map('map', mapOptions));
    } else {
      /* eslint no-unused-vars: 0 */
      const fogEffect = new mapData.Polygon({
        strokeOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#f00',
        fillOpacity: 0.8,
        fillColor: '#fff',
        zIndex: 3,
        map: naverMap,
        paths: [
          [
            new mapData.LatLng(37, 126),
            new mapData.LatLng(37, 128),
            new mapData.LatLng(38, 128),
            new mapData.LatLng(38, 126),
          ],
          [
            ...cityData[0].geometry.coordinates[0][0].map((latlng) => {
              return mapData.LatLng(latlng[1], latlng[0]);
            }),
          ],
        ],
      });

      districtData.forEach((district) => {
        naverMap.data.addGeoJson(district);
      });
      naverMap.data.setStyle(naverMapStyleConfigObj);
      mapData.Event.addListener(naverMap, 'zoom_changed', handleZoomEvent);
      addEventInMap('mouseover', handleMouseoverEvent);
      addEventInMap('mouseout', handleMouseoutEvent);
      addEventInMap('click', handleClickEvent);
    }
    /* eslint react-hooks/exhaustive-deps: 0 */
  }, [naverMap]);

  return (
    <div className="naver-map-container">
      <div id="map" />
    </div>
  );
};

export default MatchMap;
