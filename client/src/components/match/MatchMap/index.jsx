import React, { useState, useEffect, useContext } from 'react';
import loadJs from 'load-js';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';
import useAsync from '../../../hooks/useAsync';
import { MatchContext } from '../../../contexts/Match/Context';
import matchActions from '../../../contexts/Match/Actions';
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
  overDistrictCnt:
    '<div style="position:relative; display:inline-block; text-align:center; font-size:20px; width:400px; heigth:30px; top:-15px; left:-200px; color:red;"> <span>더 이상 지역구를 선택할 수 없습니다.</span> </div>',
};

const LIMIT_SELECT_DISTRICT_CNT = 5;
const ONE_SECOND = 1000;

const getNaverMap = async () => {
  await loadJs({ url: NAVER_MAP_API_REQUEST_URL, cache: false });
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
        <div className="spinner-container">
          <MDSpinner size="80px" borderSize="7px" />
        </div>
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
  const { matchState, dispatch } = useContext(MatchContext);
  const [naverMap, setNaverMap] = useState(undefined);
  const [curMarker, setCurMarker] = useState([]);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [selectedNum, setSelectedNum] = useState(0);

  const createMapTitleMarker = () => {
    return new mapData.Marker({
      clickable: false,
      icon: {
        content: markerElement.mapTitle,
      },
      map: naverMap,
      zIndex: 2,
    });
  };

  const createWarningMarker = () => {
    return new mapData.Marker({
      position: naverMap.getCenter(),
      clickable: false,
      icon: {
        content: markerElement.overDistrictCnt,
      },
      map: naverMap,
      zIndex: 10,
    });
  };

  const createFogEffectMarker = () => {
    const MAP_MAX_SIZE = 900;
    return new mapData.Marker({
      icon: {
        path: [
          new mapData.Point(0, 0),
          new mapData.Point(0, MAP_MAX_SIZE),
          new mapData.Point(MAP_MAX_SIZE, MAP_MAX_SIZE),
          new mapData.Point(MAP_MAX_SIZE, 0),
        ],
        style: 'closedPath',
        fillColor: '#ffffff',
        fillOpacity: 0.8,
        strokeColor: '#ffffff',
      },
      map: naverMap,
      zIndex: 9,
    });
  };

  const showOverDistrictCntWarning = () => {
    const warningMarker = createWarningMarker();
    const fogEffect = createFogEffectMarker();
    setTimeout(() => {
      warningMarker.setMap(null);
      fogEffect.setMap(null);
    }, ONE_SECOND);
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
      fillColor: '#71ACAD',
      fillOpacity: 0.6,
      strokeColor: '#71ACAD',
      zIndex: 4,
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
        return defaultOption;
    }
  };

  const addEvent = (isGlobal, target, action, handler) => {
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

  // 마우스 이벤트
  const mouseoverEvent = (target) => {
    if (checkingIsClicked(target)) return;
    target.setStyle(setDistrictOption('mouseover'));
  };

  const mouseoutEvent = (target) => {
    if (checkingIsClicked(target)) return;
    target.setStyle(setDistrictOption());
  };

  const clickEvent = (target) => {
    if (selectedNum > LIMIT_SELECT_DISTRICT_CNT) {
      return;
    }
    if (selectedNum === LIMIT_SELECT_DISTRICT_CNT) {
      if (!checkingIsClicked(target)) {
        if (!naverMap) return;
        showOverDistrictCntWarning();
        return;
      }
    }
    const clickedDName = target.property_sig_kor_nm;
    dispatch({
      type: matchActions.CLICK_DISTRICT,
      payload: { clickedDName },
    });
  };

  const registMarkerEvent = (marker) => {
    const target = marker.district;
    const _ = null;
    addEvent(true, marker, 'mouseover', mouseoverEvent.bind(_, target));
    addEvent(true, marker, 'mouseout', mouseoutEvent.bind(_, target));
    addEvent(true, marker, 'click', clickEvent.bind(_, target));
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
      if (prev.length > 0) {
        prev[0].setMap(null);
      }
      if (districtInfo.isSelected) {
        return [];
      }
      const newMaker = createNameMarker(districtInfo, district);
      return [newMaker];
    });
  };

  useEffect(() => {
    if (curMarker.length === 0) {
      return;
    }
    registMarkerEvent(curMarker[0]);
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
    });
    setSelectedMarkers(newSelectedMarker);
  };

  useEffect(() => {
    selectedMarkers.forEach((marker) => {
      registMarkerEvent(marker);
    });
  }, [selectedMarkers]);

  // 지역구 이벤트
  const handleDistrictMouseoverEvent = (e) => {
    mouseoverEvent(e.feature);
    setDistrictNameMarker(e.feature);
  };

  const handleDistrictMouseoutEvent = (e) => {
    mouseoutEvent(e.feature);
  };

  const handleDistrictClickEvent = (e) => {
    clickEvent(e.feature);
  };

  const handleDistrictOutEvent = () => {
    setCurMarker((prev) => {
      if (prev.length > 0) {
        prev[0].setMap(null);
      }
      return [];
    });
  };

  const registDistrictEvent = (map) => {
    addEvent(false, map.data, 'mouseover', handleDistrictMouseoverEvent);
    addEvent(false, map.data, 'mouseout', handleDistrictMouseoutEvent);
    addEvent(false, map.data, 'click', handleDistrictClickEvent);
    addEvent(true, map, 'mousemove', handleDistrictOutEvent);
    addEvent(true, map, 'mouseout', handleDistrictOutEvent);
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
    countSelectedDistrict(matchState.districtInfo);
    manageSelectedDistrict(matchState.districtInfo);
  }, [matchState.districtInfo]);

  useEffect(() => {
    if (naverMap === undefined) {
      setNaverMap(new mapData.Map('map', mapInitOptions));
    } else {
      createMapTitleMarker();
      districtData.forEach((district) => {
        naverMap.data.addGeoJson(district);
      });
      naverMap.data.setStyle(setDistrictOption());
      registDistrictEvent(naverMap);
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
