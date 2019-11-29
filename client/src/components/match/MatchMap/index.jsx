import React, { useState, useEffect } from 'react';
import loadJs from 'load-js';
import axios from 'axios';
import './index.scss';

const SEOUL_KOREAN = '서울';
const SEOUL_DISTRICT_CNT = '25';
const SEOUL_DISTRICT_REQUEST_URL = `/req/data?request=GetFeature&key=${process.env.REACT_APP_MAP_DISTRICT_KEY}&size=${SEOUL_DISTRICT_CNT}&data=LT_C_ADSIGG_INFO&attrfilter=full_nm:like:${SEOUL_KOREAN}&domain=${process.env.REACT_APP_DOMAIN}`;

const NAVER_MAP_API_REQUEST_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCP_CLIENT_ID}`;

const MatchMap = () => {
  const [seoulDistrictData, setSeoulDistrictData] = useState();
  const [naverMapData, setNaverMapData] = useState();

  // data 요청
  useEffect(() => {
    const fetchDatas = async () => {
      await loadJs(NAVER_MAP_API_REQUEST_URL);
      setNaverMapData(window.naver.maps);
      const seoulDistrictResponse = await axios(SEOUL_DISTRICT_REQUEST_URL);
      setSeoulDistrictData(
        seoulDistrictResponse.data.response.result.featureCollection.features
      );
    };
    fetchDatas();
    return () => {
      setSeoulDistrictData(undefined);
      setNaverMapData(undefined);
    };
  }, []);

  return (
    <div className="match-map">
      {naverMapData && seoulDistrictData ? (
        <NaverMap naverMap={naverMapData} districtData={seoulDistrictData} />
      ) : (
        <span>지도 로딩중!!!!</span>
      )}
    </div>
  );
};

const SEOUL = {
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

const NaverMap = (props) => {
  /* eslint react/prop-types: 0 */
  const { naverMap, districtData } = props;
  const [seoulCoord, setSeoulCoord] = useState(
    new naverMap.LatLngBounds(
      new naverMap.LatLng(SEOUL.SOUTH_WEST.LAT, SEOUL.SOUTH_WEST.LNG),
      new naverMap.LatLng(SEOUL.NORTH_EAST.LAT, SEOUL.NORTH_EAST.LNG)
    )
  );
  const [map, setMap] = useState();

  const mapOptions = {
    useStyleMap: true,
    zoom: 11,
    minZoom: 11,
    maxZoom: 16,
    zoomControl: true,
    zoomControlOptions: {
      style: naverMap.ZoomControlStyle.SMALL,
    },
    center: new naverMap.LatLng(SEOUL.CENTER.LAT, SEOUL.CENTER.LNG),
    maxBounds: seoulCoord,
    mapTypes: new naverMap.MapTypeRegistry({
      normal: naverMap.NaverStyleMapTypeOption.getVectorMap(),
      label: naverMap.NaverStyleMapTypeOption.getNormalMap(),
    }),
  };

  const createNaverMap = () => {
    return new naverMap.Map('map', mapOptions);
  };

  const naverMapStyleConfigObj = {
    fillColor: '#000000',
    fillOpacity: 0,
    strokeColor: '#272A51',
    strokeWeight: 2,
    strokeOpacity: 1,
    clickable: true,
    zIndex: 1,
  };

  useEffect(() => {
    const maps = createNaverMap();
    naverMap.Event.addListener(maps, 'zoom_changed', (zoom) => {
      const label = new naverMap.Layer('label', maps.mapTypes.label);
      const normal = new naverMap.Layer('normal', maps.mapTypes.normal);
      if (zoom >= 13) {
        label.setMap(maps);
        naverMapStyleConfigObj.clickable = false;
        maps.data.setStyle(naverMapStyleConfigObj);
        return;
      }
      normal.setMap(maps);
      naverMapStyleConfigObj.clickable = true;
      maps.data.setStyle(naverMapStyleConfigObj);
    });

    const seoulDistricts = districtData;
    seoulDistricts.forEach((district) => {
      maps.data.addGeoJson(district);
      maps.data.setStyle(naverMapStyleConfigObj);
    });

    maps.data.addListener('mouseover', (e) => {
      maps.data.overrideStyle(e.feature, {
        fillOpacity: 0.6,
        strokeOpacity: 0.6,
        strokeWeight: 20,
        strokeColor: '#71ACAD',
        fillColor: '#71ACAD',
        zIndex: 2,
      });
    });

    maps.data.addListener('mouseout', () => {
      maps.data.revertStyle();
    });

    maps.data.addListener('click', (e) => {
      const selectedDistrict = e.feature.getBounds();
      if (selectedDistrict) {
        maps.panToBounds(selectedDistrict);
      }
    });
  }, [map, seoulCoord]);

  return (
    <div className="naver-map-container">
      <div id="map" />
    </div>
  );
};
export default MatchMap;
