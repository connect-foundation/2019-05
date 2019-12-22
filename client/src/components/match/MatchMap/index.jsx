import React, { useState, useEffect, useContext } from 'react';
import loadJs from 'load-js';
import axios from 'axios';

import useAsync from '../../../hooks/useAsync';
import { MatchActionCreator, MatchContext } from '../../../contexts/Match';
import { FetchLoadingView, FetchErrorView } from '../../../template';

import './index.scss';

const NAVER_MAP_API_REQUEST_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCP_CLIENT_ID}`;
const SEOUL_DISTRICT_REQUEST_URL = `${process.env.REACT_APP_API_SERVER_ADDRESS}/map`;

const MAP_FETCH_ERROR_MSG = '맵 불러오기를 실패했습니다...';
const DISTRICT_FETCH_ERROR_MSG = '지역 정보 불러오기를 실패했습니다...';

const markerElement = {
  districtName: (name) => {
    const width = (name.length + 2) * 10;
    return `
        <div style=" position:relative; color:white; display:block; width:${width}px; height:24px; text-align:center; font-size:15px;">
          <span>${name}</span>
        </div>`;
  },
};

const getNaverMap = async () => {
  await loadJs({ url: NAVER_MAP_API_REQUEST_URL, cache: false });
  return window.naver.maps;
};

const getDistrcitData = async () => {
  const response = await axios(SEOUL_DISTRICT_REQUEST_URL);
  return response.data.districtInfo.features;
};

const MapView = (mapData, districtData) => {
  return <NaverMap mapData={mapData} districtData={districtData} />;
};

const renderingMatchMapView = (map, refetchMap, district, refetchDistrict) => {
  const { loading: mapLoading, data: mapData, error: mapError } = map;
  const {
    loading: districtLoding,
    data: districtData,
    error: districtError,
  } = district;
  if (mapLoading || districtLoding) {
    return FetchLoadingView();
  }
  if (mapError) {
    return FetchErrorView(refetchMap, MAP_FETCH_ERROR_MSG);
  }
  if (districtError) {
    return FetchErrorView(refetchDistrict, DISTRICT_FETCH_ERROR_MSG);
  }
  if (!mapData) return null;
  if (!districtData) return null;
  return MapView(mapData, districtData);
};

const MatchMap = () => {
  const [naverMapState, reFetchNaverMap] = useAsync(getNaverMap, []);
  const [seoulDistrictState, reFetchDisrictData] = useAsync(
    getDistrcitData,
    []
  );

  return (
    <div className="match-map">
      {renderingMatchMapView(
        naverMapState,
        reFetchNaverMap,
        seoulDistrictState,
        reFetchDisrictData
      )}
    </div>
  );
};

const NaverMap = (props) => {
  /* eslint react/prop-types: 0 */
  const { mapData, districtData } = props;
  const { matchState, matchDispatch } = useContext(MatchContext);
  const [naverMap, setNaverMap] = useState(undefined);
  const [curMarker, setCurMarker] = useState(null);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [selectedNum, setSelectedNum] = useState(0);

  useEffect(() => {
    // matchDispatch(MatchActionCreator.initialDistrict());
    return () => {
      matchDispatch(MatchActionCreator.initialDistrict());
    };
  }, []);

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
      fillColor: '#28aae2',
      fillOpacity: 0.6,
      strokeColor: '#28aae2',
      zIndex: 4,
    };
    /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
    switch (action) {
      case 'mouseover':
        return {
          ...defaultOption,
          fillColor: '#28aae2',
          fillOpacity: 1,
          strokeColor: '#28aae2',
          zIndex: 5,
        };
      case 'click':
        return {
          ...defaultOption,
          fillColor: '#373d75',
          fillOpacity: 0.9,
          strokeColor: '#373d75',
          zIndex: 6,
        };
      default:
        return defaultOption;
    }
  };

  const addEvent = (target, action, handler, isGlobal = false) => {
    if (isGlobal) {
      if (!window.naver) {
        return;
      }
      if (!window.naver.maps.Event.hasListener(target, action)) {
        window.naver.maps.Event.addListener(target, action, handler);
      }
      return;
    }
    if (!target.hasListener(action)) {
      target.addListener(action, handler);
    }
  };

  const findDistrictInfo = (target) => {
    const name = target.property_sig_kor_nm;
    return Object.values(matchState.districtInfo).filter(
      (d) => d.KOR_NAME === name
    )[0];
  };

  const checkingIsClicked = (target) => {
    return findDistrictInfo(target).isSelected;
  };

  // 마커 생성
  const createNameMarker = (districtInfo, target) => {
    const name = target.property_sig_kor_nm;
    return new mapData.Marker({
      position: new mapData.LatLng(
        districtInfo.namePosition.y,
        districtInfo.namePosition.x
      ),
      icon: {
        content: markerElement.districtName(name),
      },
      map: naverMap,
      district: target,
    });
  };

  // 지역구 이름 마커 지정 함수
  const setDistrictNameMarker = (district) => {
    const districtInfo = findDistrictInfo(district);
    setCurMarker((prev) => {
      if (prev) {
        const prevInfo = findDistrictInfo(prev.district);
        if (!prevInfo.isSelected) {
          prev.district.setStyle(setDistrictOption());
        }
        prev.setMap(null);
      }
      if (districtInfo.isSelected) {
        return null;
      }
      const newMarker = createNameMarker(districtInfo, district);
      return newMarker;
    });
  };

  // 마우스 이벤트
  const mouseoverEvent = (target) => {
    setDistrictNameMarker(target);
    if (checkingIsClicked(target)) {
      target.setStyle(setDistrictOption('click'));
      return;
    }
    target.setStyle(setDistrictOption('mouseover'));
  };

  const mouseoutEvent = (target) => {
    if (checkingIsClicked(target)) {
      target.setStyle(setDistrictOption('click'));
      return;
    }
    target.setStyle(setDistrictOption());
  };

  const clickEvent = (target) => {
    const clickedDName = target.property_sig_kor_nm;
    matchDispatch(MatchActionCreator.clickDistrict(clickedDName));
  };

  const registMarkerEvent = (marker) => {
    const target = marker.district;
    const _ = null;
    addEvent(marker, 'mouseover', mouseoverEvent.bind(_, target), true);
    addEvent(marker, 'mouseout', mouseoutEvent.bind(_, target), true);
    addEvent(marker, 'click', clickEvent.bind(_, target), true);
  };

  useEffect(() => {
    if (!curMarker) {
      return;
    }
    registMarkerEvent(curMarker);
    curMarker.district.setStyle(setDistrictOption('mouseover'));
  }, [curMarker]);

  // 모든 지역구 옵션 해제
  const initializeDistrictOption = () => {
    if (!naverMap) return;
    naverMap.data.getAllFeature().forEach((target) => {
      target.setStyle(setDistrictOption());
    });
  };

  // 해당 이름으로 지역구 찾기
  const getClickedDistrict = (name) => {
    if (!naverMap) return undefined;
    return naverMap.data
      .getAllFeature()
      .filter((target) => target.property_sig_kor_nm === name)[0];
  };

  // 지역구의 상태 변화에 따른 선택된 지역구들의 상태 관리
  const manageSelectedDistrict = (districtsInfo) => {
    initializeDistrictOption();
    selectedMarkers.forEach((prevMarker) => {
      prevMarker.setMap(null);
    });
    const newSelectedMarker = [];
    Object.values(districtsInfo).forEach((info) => {
      if (!info.isSelected) {
        return;
      }
      const target = getClickedDistrict(info.KOR_NAME);
      target.setStyle(setDistrictOption('click'));
      const marker = createNameMarker(info, target);
      newSelectedMarker.push(marker);
      registMarkerEvent(marker);
    });
    setSelectedMarkers(newSelectedMarker);
  };

  // 지역구 이벤트

  const convertEvent = (cb, e) => {
    cb(e.feature);
  };

  const districtOutEvent = () => {
    setCurMarker((prev) => {
      if (prev) {
        const prevInfo = findDistrictInfo(prev.district);
        if (!prevInfo.isSelected) {
          prev.district.setStyle(setDistrictOption());
        }
        prev.setMap(null);
      }
      return null;
    });
  };

  const registDistrictEvent = (map) => {
    const _ = null;
    addEvent(map.data, 'mouseover', convertEvent.bind(_, mouseoverEvent));
    addEvent(map.data, 'mouseout', convertEvent.bind(_, mouseoutEvent));
    addEvent(map.data, 'click', convertEvent.bind(_, clickEvent));
    addEvent(map, 'mousemove', districtOutEvent, true);
    addEvent(map, 'mouseout', districtOutEvent, true);
  };

  const unregistDistrictEvent = (map) => {
    window.naver.maps.Event.clearInstanceListeners(map.data);
  };

  const countSelectedDistrict = (infos) => {
    const cnt = Object.values(infos).filter((info) => info.isSelected).length;
    setSelectedNum(cnt);
  };

  useEffect(() => {
    if (!naverMap) return;
    unregistDistrictEvent(naverMap);
    registDistrictEvent(naverMap);
  }, [selectedNum]);

  useEffect(() => {
    if (!naverMap) return;
    countSelectedDistrict(matchState.districtInfo);
    manageSelectedDistrict(matchState.districtInfo);
  }, [matchState.districtInfo]);

  useEffect(() => {
    if (!naverMap) {
      setNaverMap(new mapData.Map('map', mapInitOptions));
      return;
    }
    districtData.forEach((district) => {
      naverMap.data.addGeoJson(district);
    });
    naverMap.data.setStyle(setDistrictOption());
    registDistrictEvent(naverMap);
    /* eslint react-hooks/exhaustive-deps: 0 */
  }, [naverMap]);

  return (
    <div className="naver-map-container">
      <div id="map" />
    </div>
  );
};

export default MatchMap;
