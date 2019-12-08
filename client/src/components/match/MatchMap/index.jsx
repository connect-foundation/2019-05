import React, { useState, useEffect } from 'react';
import loadJs from 'load-js';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';
import './index.scss';

const SEOUL = {
  KOREAN: '서울',
  DISTRICT_CNT: '25',
};

const NAVER_MAP_API_REQUEST_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCP_CLIENT_ID}`;
const SEOUL_DISTRICT_REQUEST_URL = `/req/data?request=GetFeature&key=${process.env.REACT_APP_MAP_DISTRICT_KEY}&size=${SEOUL.DISTRICT_CNT}&data=LT_C_ADSIGG_INFO&attrfilter=full_nm:like:${SEOUL.KOREAN}&domain=${process.env.REACT_APP_DOMAIN}`;

const markerElement = {
  mapTitle:
    '<div style="display:inline-block; text-align:center; font-size:20px; margin-top: 50px; width: 265px; heigth: 25px;"> <span>서울 지역구 풋살 매칭 현황 지도</span> </div>',
  districtName: (name) => {
    return `
        <div style=" position:relative; display:block; width: 60px; height: 24px; left: -30px; top: -12px; text-align:center; font-size:15px;">
          <span>${name}</span>
        </div>`;
  },
};

const MatchMap = () => {
  const [naverMapData, setNaverMapData] = useState();
  const [seoulDistrictData, setSeoulDistrictData] = useState();

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
        <NaverMap mapData={naverMapData} districtData={seoulDistrictData} />
      ) : (
        <MDSpinner size="80px" borderSize="7px" />
      )}
    </div>
  );
};

const NaverMap = (props) => {
  /* eslint react/prop-types: 0 */
  const { mapData, districtData } = props;
  const [naverMap, setNaverMap] = useState(undefined);

  const mapInitOptions = {
    zoom: 11,
    draggable: false,
    scrollWheel: false,
    background: '#ffffff',
    disableDoubleClickZoom: true,
    mapDataControl: false,
    scaleControl: false,
    mapTypes: new mapData.MapTypeRegistry({
      normal: mapData.NaverStyleMapTypeOption.getBlankMap(),
    }),
  };
  const naverMapStyleConfig = {
    fillColor: '#71ACAD',
    fillOpacity: 0.6,
    strokeColor: '#71ACAD',
    strokeOpacity: 1,
    strokeWeight: 2,
    strokeStyle: 'solid',
    clickable: true,
    zIndex: 4,
  };
  const selectedDistrictOption = () => {
    const styleOption = { ...naverMapStyleConfig };
    styleOption.fillColor = '#71ACAD';
    styleOption.fillOpacity = 1;
    styleOption.strokeColor = '#71ACAD';
    styleOption.strokeOpacity = 1;
    styleOption.strokeStyle = 'solid';
    styleOption.strokeWeight = 1;
    styleOption.zIndex = 5;
    return styleOption;
  };

  const addEvent = (isGlobal, target, action, handler) => {
    if (isGlobal) {
      if (!window.naver.maps.Event.hasListener(target, action)) {
        window.naver.maps.Event.addListener(target, action, handler);
      }
      return;
    }
    if (!target.hasListener(action)) {
      target.addListener(action, handler);
    }
  };

  let districtMarker;
  const createDistrictNameMarker = (district) => {
    districtMarker = new mapData.Marker({
      position: district.getBounds().getCenter(),
      clickable: true,
      icon: {
        content: markerElement.districtName(district.property_sig_kor_nm),
      },
      map: naverMap,
    });
    const handleMarkerEvent = (option) => {
      district.setStyle(option);
    };
    addEvent(
      true,
      districtMarker,
      'mouseover',
      handleMarkerEvent.bind(null, selectedDistrictOption())
    );
    addEvent(
      true,
      districtMarker,
      'mouseout',
      handleMarkerEvent.bind(null, naverMapStyleConfig)
    );
  };

  const handleDistrictMouseoverEvent = (e) => {
    if (districtMarker) {
      districtMarker.setMap(null);
    }
    const selecteDistrictOption = selectedDistrictOption();
    e.feature.setStyle(selecteDistrictOption);
    createDistrictNameMarker(e.feature, selecteDistrictOption);
  };

  const handleDistrictMouseoutEvent = (e) => {
    e.feature.setStyle(naverMapStyleConfig);
  };

  const handleDistrictMousemoveEvent = () => {
    if (districtMarker) {
      districtMarker.setMap(null);
    }
  };

  const createMapTitleMarker = () => {
    return new mapData.Marker({
      position: mapData.Position.TOP_LEFT,
      clickable: false,
      icon: {
        content: markerElement.mapTitle,
      },
      map: naverMap,
    });
  };

  useEffect(() => {
    if (naverMap === undefined) {
      setNaverMap(new mapData.Map('map', mapInitOptions));
    } else {
      createMapTitleMarker();
      districtData.forEach((district) => {
        naverMap.data.addGeoJson(district);
      });
      naverMap.data.setStyle(naverMapStyleConfig);
      addEvent(false, naverMap.data, 'mouseover', handleDistrictMouseoverEvent);
      addEvent(false, naverMap.data, 'mouseout', handleDistrictMouseoutEvent);
      addEvent(true, naverMap, 'mousemove', handleDistrictMousemoveEvent);
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
