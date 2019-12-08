import React, { useState, useEffect } from 'react';
import loadJs from 'load-js';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';
import './index.scss';

let districtInfo = {
  종로구: {
    namePosition: { x: 126.9672221, y: 37.5883778 },
    isSelected: false,
  },
  중구: { namePosition: { x: 126.9805817, y: 37.5666103 }, isSelected: false },
  용산구: {
    namePosition: { x: 126.9605354, y: 37.5383031 },
    isSelected: false,
  },
  성동구: {
    namePosition: { x: 127.0216469, y: 37.5562685 },
    isSelected: false,
  },
  광진구: {
    namePosition: { x: 127.0690254, y: 37.5508249 },
    isSelected: false,
  },
  동대문구: {
    namePosition: { x: 127.0320798, y: 37.5889219 },
    isSelected: false,
  },
  중랑구: {
    namePosition: { x: 127.0758919, y: 37.5992591 },
    isSelected: false,
  },
  성북구: {
    namePosition: { x: 126.9983009, y: 37.608507 },
    isSelected: false,
  },
  강북구: {
    namePosition: { x: 126.9948677, y: 37.6427686 },
    isSelected: false,
  },
  도봉구: {
    namePosition: { x: 127.0161403, y: 37.6683185 },
    isSelected: false,
  },
  노원구: {
    namePosition: { x: 127.0587257, y: 37.6509238 },
    isSelected: false,
  },
  은평구: {
    namePosition: { x: 126.909037, y: 37.6231925 },
    isSelected: false,
  },
  서대문구: {
    namePosition: { x: 126.9122767, y: 37.5807599 },
    isSelected: false,
  },
  마포구: {
    namePosition: { x: 126.8843178, y: 37.5638889 },
    isSelected: false,
  },
  양천구: {
    namePosition: { x: 126.8348793, y: 37.5281454 },
    isSelected: false,
  },
  강서구: {
    namePosition: { x: 126.8061737, y: 37.5687873 },
    isSelected: false,
  },
  구로구: {
    namePosition: { x: 126.8259529, y: 37.4990907 },
    isSelected: false,
  },
  금천구: { namePosition: { x: 126.8816311, y: 37.466943 }, isSelected: false },
  영등포구: {
    namePosition: { x: 126.8911842, y: 37.5290465 },
    isSelected: false,
  },
  동작구: {
    namePosition: { x: 126.9296364, y: 37.5099851 },
    isSelected: false,
  },
  관악구: {
    namePosition: { x: 126.9268898, y: 37.4723928 },
    isSelected: false,
  },
  서초구: {
    namePosition: { x: 126.9886879, y: 37.4887396 },
    isSelected: false,
  },
  강남구: {
    namePosition: { x: 127.0456795, y: 37.4969117 },
    isSelected: false,
  },
  송파구: {
    namePosition: { x: 127.0985512, y: 37.5088957 },
    isSelected: false,
  },
  강동구: {
    namePosition: { x: 127.1280769, y: 37.5589902 },
    isSelected: false,
  },
};

const NAVER_MAP_API_REQUEST_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCP_CLIENT_ID}`;
const SEOUL_DISTRICT_REQUEST_URL = `/req/data?request=GetFeature&key=${process.env.REACT_APP_MAP_DISTRICT_KEY}&size=25&data=LT_C_ADSIGG_INFO&attrfilter=full_nm:like:서울&domain=${process.env.REACT_APP_DOMAIN}`;

const markerElement = {
  mapTitle:
    '<div style="display:inline-block; text-align:center; font-size:20px; margin-top: 50px; width: 265px; heigth: 25px;"> <span>서울 지역구 풋살 매칭 현황 지도</span> </div>',
  districtName: (name) => {
    const width = (name.length + 2) * 10;
    return `
        <div style=" position:relative; display:block; width:${width}px; height:24px; text-align:center; font-size:15px;">
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

  const setDistrictOption = (action) => {
    const defaultOption = {
      strokeOpacity: 1,
      strokeWeight: 2,
    };
    /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
    switch (action) {
      case 'mouseover':
        return {
          ...defaultOption,
          fillColor: '#71ACAD',
          fillOpacity: 1,
          strokeColor: '#71ACAD',
          zIndex: 5,
        };
      case 'click':
        return {
          ...defaultOption,
          fillColor: '#373d75',
          fillOpacity: 0.6,
          strokeColor: '#373d75',
          zIndex: 6,
        };
      default:
        return {
          ...defaultOption,
          fillColor: '#71ACAD',
          fillOpacity: 0.6,
          strokeColor: '#71ACAD',
          zIndex: 4,
        };
    }
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

  // 현재 마우스 이벤트에 따라 나오는 마커
  let districtMarker;
  // 선택한 지역구의 마커들
  let selectedDistrictMarker = {};

  const showSelectedDistrictMarker = () => {
    Object.values(selectedDistrictMarker).forEach((marker) => {
      marker.setMap(naverMap);
    });
  };

  const hideAllDistrictMarker = () => {
    Object.values(selectedDistrictMarker).forEach((marker) => {
      marker.setMap(null);
    });
  };

  // 마커와 지역구에 등록할 공통 이벤트
  const mouseoverEvent = (target) => {
    const curDistrictName = target.property_sig_kor_nm;
    if (districtInfo[curDistrictName].isSelected) {
      return;
    }
    target.setStyle(setDistrictOption('mouseover'));
  };

  const mouseoutEvent = (target) => {
    const curDistrictName = target.property_sig_kor_nm;
    showSelectedDistrictMarker();
    if (districtInfo[curDistrictName].isSelected) {
      return;
    }
    target.setStyle(setDistrictOption());
  };

  const clickEvent = (target) => {
    const curDistrictName = target.property_sig_kor_nm;
    hideAllDistrictMarker();
    const preDistrictInfo = { ...districtInfo };
    const isSelected = !preDistrictInfo[curDistrictName].isSelected;
    preDistrictInfo[curDistrictName].isSelected = isSelected;
    districtInfo = preDistrictInfo;
    const curAction = isSelected ? 'click' : '';
    target.setStyle(setDistrictOption(curAction));
    if (isSelected) {
      if (!selectedDistrictMarker[curDistrictName]) {
        selectedDistrictMarker[curDistrictName] = districtMarker;
      }
      showSelectedDistrictMarker();
      return;
    }
    if (selectedDistrictMarker[curDistrictName]) {
      const newMarkers = {};
      Object.entries(selectedDistrictMarker).forEach(([markerName, marker]) => {
        if (markerName !== curDistrictName) {
          newMarkers[markerName] = marker;
        }
      });
      selectedDistrictMarker = { ...newMarkers };
    }
    showSelectedDistrictMarker();
  };

  // 지역구 이름 마커 생성 함수
  const createDistrictNameMarker = (district) => {
    const curDistrictName = district.property_sig_kor_nm;
    districtMarker = new mapData.Marker({
      position: new mapData.LatLng(
        districtInfo[curDistrictName].namePosition.y,
        districtInfo[curDistrictName].namePosition.x
      ),
      clickable: true,
      icon: {
        content: markerElement.districtName(curDistrictName),
      },
      map: naverMap,
    });
    addEvent(
      true,
      districtMarker,
      'mouseover',
      mouseoverEvent.bind(null, district)
    );
    addEvent(
      true,
      districtMarker,
      'mouseout',
      mouseoutEvent.bind(null, district)
    );
    addEvent(true, districtMarker, 'click', clickEvent.bind(null, district));
  };

  // 지역구에 등록할 이벤트
  const handleDistrictMouseoverEvent = (e) => {
    if (districtMarker) {
      districtMarker.setMap(null);
    }
    mouseoverEvent(e.feature);
    createDistrictNameMarker(e.feature);
  };

  const handleDistrictMouseoutEvent = (e) => {
    mouseoutEvent(e.feature);
  };

  const handleDistrictClickEvent = (e) => {
    clickEvent(e.feature);
  };

  const handleDistrictMousemoveEvent = () => {
    if (districtMarker) {
      districtMarker.setMap(null);
    }
  };

  useEffect(() => {
    if (naverMap === undefined) {
      setNaverMap(new mapData.Map('map', mapInitOptions));
    } else {
      createMapTitleMarker();
      districtData.forEach((district) => {
        naverMap.data.addGeoJson(district);
      });
      naverMap.data.setStyle(setDistrictOption());
      addEvent(false, naverMap.data, 'mouseover', handleDistrictMouseoverEvent);
      addEvent(false, naverMap.data, 'mouseout', handleDistrictMouseoutEvent);
      addEvent(false, naverMap.data, 'click', handleDistrictClickEvent);
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
