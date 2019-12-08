import React, { useState, useEffect } from 'react';
import loadJs from 'load-js';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';
import './index.scss';

let districtInfo = {
  종로구: {
    namePosition: { x: 126.9831947, y: 37.5829365 },
    isSelected: false,
  },
  중구: { namePosition: { x: 126.9955543, y: 37.5595345 }, isSelected: false },
  용산구: { isSelected: false },
  성동구: { isSelected: false },
  광진구: { namePosition: { x: 127.083445, y: 37.5448365 }, isSelected: false },
  동대문구: {
    namePosition: { x: 127.0525459, y: 37.5807599 },
    isSelected: false,
  },
  중랑구: { isSelected: false },
  성북구: {
    namePosition: { x: 127.0209602, y: 37.5998031 },
    isSelected: false,
  },
  강북구: { namePosition: { x: 127.0113472, y: 37.6357 }, isSelected: false },
  도봉구: {
    namePosition: { x: 127.0340065, y: 37.6628831 },
    isSelected: false,
  },
  노원구: {
    namePosition: { x: 127.0752052, y: 37.6509238 },
    isSelected: false,
  },
  은평구: { namePosition: { x: 126.9275764, y: 37.616666 }, isSelected: false },
  서대문구: {
    namePosition: { x: 126.9337562, y: 37.5742296 },
    isSelected: false,
  },
  마포구: {
    namePosition: { x: 126.9069771, y: 37.5568129 },
    isSelected: false,
  },
  양천구: {
    namePosition: { x: 126.8554787, y: 37.5183333 },
    isSelected: false,
  },
  강서구: {
    namePosition: { x: 126.8211464, y: 37.5624572 },
    isSelected: false,
  },
  구로구: {
    namePosition: { x: 126.8424324, y: 37.4925533 },
    isSelected: false,
  },
  금천구: { isSelected: false },
  영등포구: { isSelected: false },
  동작구: {
    namePosition: { x: 126.9509224, y: 37.5023592 },
    isSelected: false,
  },
  관악구: { isSelected: false },
  서초구: {
    namePosition: { x: 127.0106605, y: 37.4794768 },
    isSelected: false,
  },
  강남구: {
    namePosition: { x: 127.0552925, y: 37.4952773 },
    isSelected: false,
  },
  송파구: { isSelected: false },
  강동구: { isSelected: false },
};

const NAVER_MAP_API_REQUEST_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCP_CLIENT_ID}`;
const SEOUL_DISTRICT_REQUEST_URL = `/req/data?request=GetFeature&key=${process.env.REACT_APP_MAP_DISTRICT_KEY}&size=25&data=LT_C_ADSIGG_INFO&attrfilter=full_nm:like:서울&domain=${process.env.REACT_APP_DOMAIN}`;

const markerElement = {
  mapTitle:
    '<div style="display:inline-block; text-align:center; font-size:20px; margin-top: 50px; width: 265px; heigth: 25px;"> <span>서울 지역구 풋살 매칭 현황 지도</span> </div>',
  districtName: (name) => {
    return `
        <div style=" position:relative; display:block; width: 60px; height: 24px; left: -30px; top: -12px; text-align:center; font-size:15px; ">
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

  const getDistrictCenter = (district, name) => {
    if (districtInfo[name].namePosition === undefined) {
      return district.getBounds().getCenter();
    }
    return new mapData.LatLng(
      districtInfo[name].namePosition.y,
      districtInfo[name].namePosition.x
    );
  };

  let districtMarker;
  const createDistrictNameMarker = (district) => {
    const name = district.property_sig_kor_nm;
    districtMarker = new mapData.Marker({
      position: getDistrictCenter(district, name),
      clickable: true,
      icon: {
        content: markerElement.districtName(name),
      },
      map: naverMap,
    });
    addEvent(true, districtMarker, 'mouseover', () => {
      const curDistrict = district.property_sig_kor_nm;
      if (districtInfo[curDistrict].isSelected) {
        return;
      }
      district.setStyle(setDistrictOption('mouseover'));
    });
    addEvent(true, districtMarker, 'mouseout', () => {
      const curDistrict = district.property_sig_kor_nm;
      if (districtInfo[curDistrict].isSelected) {
        return;
      }
      district.setStyle(setDistrictOption());
    });
    addEvent(true, districtMarker, 'click', () => {
      const selectedDistrict = district.property_sig_kor_nm;
      const preDistrictInfo = { ...districtInfo };
      preDistrictInfo[selectedDistrict].isSelected = !preDistrictInfo[
        selectedDistrict
      ].isSelected;
      districtInfo = preDistrictInfo;
      const curAction = preDistrictInfo[selectedDistrict].isSelected
        ? 'click'
        : '';
      district.setStyle(setDistrictOption(curAction));
      console.log(districtInfo);
    });
  };

  const handleDistrictMouseoverEvent = (e) => {
    if (districtMarker) {
      districtMarker.setMap(null);
    }
    const curDistrict = e.feature.property_sig_kor_nm;
    if (districtInfo[curDistrict].isSelected) {
      return;
    }
    const selecteDistrictOption = setDistrictOption('mouseover');
    e.feature.setStyle(selecteDistrictOption);
    createDistrictNameMarker(e.feature, selecteDistrictOption);
  };

  const handleDistrictMouseoutEvent = (e) => {
    const curDistrict = e.feature.property_sig_kor_nm;
    if (districtInfo[curDistrict].isSelected) {
      return;
    }
    e.feature.setStyle(setDistrictOption());
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
      naverMap.data.setStyle(setDistrictOption());
      addEvent(false, naverMap.data, 'mouseover', handleDistrictMouseoverEvent);
      addEvent(false, naverMap.data, 'mouseout', handleDistrictMouseoutEvent);
      addEvent(false, naverMap.data, 'click', (e) => {
        const selectedDistrict = e.feature.property_sig_kor_nm;
        const preDistrictInfo = { ...districtInfo };
        preDistrictInfo[selectedDistrict].isSelected = !preDistrictInfo[
          selectedDistrict
        ].isSelected;
        districtInfo = { ...preDistrictInfo };
        const curAction = preDistrictInfo[selectedDistrict].isSelected
          ? 'click'
          : '';
        e.feature.setStyle(setDistrictOption(curAction));
        console.log(districtInfo);
      });
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
