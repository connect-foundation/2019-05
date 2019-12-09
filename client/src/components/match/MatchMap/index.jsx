import React, { useState, useEffect } from 'react';
import loadJs from 'load-js';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';
import useAsync from '../../../hooks/useAsync';
import { changeDistrictInfo, findDistrictToName } from '../../../util';
import './index.scss';

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

const getNaverMap = async () => {
  await loadJs(NAVER_MAP_API_REQUEST_URL);
  return window.naver.maps;
};

const getDistrcitData = async () => {
  const response = await axios(SEOUL_DISTRICT_REQUEST_URL);
  return response.data.response.result.featureCollection.features;
};

const MatchMap = () => {
  const [naverMapState, reFetchNaverMap] = useAsync(getNaverMap, []);
  const [seoulDistrictState, reFetchDisrictData] = useAsync(
    getDistrcitData,
    []
  );
  const { loading: mapLoading, data: mapData, error: mapError } = naverMapState;
  const {
    loading: districtLoding,
    data: districtData,
    error: districtError,
  } = seoulDistrictState;

  if (mapLoading || districtLoding) {
    return (
      <div className="match-map">
        <MDSpinner size="80px" borderSize="7px" />
      </div>
    );
  }
  if (mapError) {
    return (
      <div className="match-map">
        <button type="button" onClick={reFetchNaverMap}>
          맵 다시 불러오기
        </button>
      </div>
    );
  }
  if (districtError) {
    return (
      <div className="match-map">
        <button type="button" onClick={reFetchDisrictData}>
          지역 정보 다시 불러오기
        </button>
      </div>
    );
  }
  if (!mapData) return null;
  if (!districtData) return null;
  return (
    <div className="match-map">
      <NaverMap mapData={mapData} districtData={districtData} />
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
    if (findDistrictToName(curDistrictName).isSelected) {
      return;
    }
    target.setStyle(setDistrictOption('mouseover'));
  };

  const mouseoutEvent = (target) => {
    const curDistrictName = target.property_sig_kor_nm;
    showSelectedDistrictMarker();
    if (findDistrictToName(curDistrictName).isSelected) {
      return;
    }
    target.setStyle(setDistrictOption());
  };

  const deleteMarkerInSelectedMarkers = (curDistrictName) => {
    if (!selectedDistrictMarker[curDistrictName]) {
      return;
    }
    const newMarkers = {};
    Object.entries(selectedDistrictMarker).forEach(([name, marker]) => {
      if (name !== curDistrictName) {
        newMarkers[name] = marker;
      }
    });
    selectedDistrictMarker = { ...newMarkers };
  };

  const insertMarkerInSelectedMarkers = (curDistrictName) => {
    if (selectedDistrictMarker[curDistrictName]) {
      return;
    }
    const newMarkers = { ...selectedDistrictMarker };
    newMarkers[curDistrictName] = districtMarker;
    selectedDistrictMarker = { ...newMarkers };
  };

  const clickEvent = (target) => {
    hideAllDistrictMarker();
    const curDistrictName = target.property_sig_kor_nm;
    const preTargetInfo = { ...findDistrictToName(curDistrictName) };
    preTargetInfo.isSelected = !preTargetInfo.isSelected;
    changeDistrictInfo(preTargetInfo);

    const curAction = preTargetInfo.isSelected ? 'click' : '';
    target.setStyle(setDistrictOption(curAction));

    const processMarkerAction = preTargetInfo.isSelected
      ? insertMarkerInSelectedMarkers
      : deleteMarkerInSelectedMarkers;
    processMarkerAction(curDistrictName);
    showSelectedDistrictMarker();
  };

  // 지역구 이름 마커 생성 함수
  const createDistrictNameMarker = (district) => {
    const curDistrictName = district.property_sig_kor_nm;
    const districtInfo = findDistrictToName(curDistrictName);
    districtMarker = new mapData.Marker({
      position: new mapData.LatLng(
        districtInfo.namePosition.y,
        districtInfo.namePosition.x
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

  const handleDistrictOutEvent = () => {
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
      addEvent(true, naverMap, 'mousemove', handleDistrictOutEvent);
      addEvent(true, naverMap, 'mouseout', handleDistrictOutEvent);
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
