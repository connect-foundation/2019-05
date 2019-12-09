import matchActions from './Actions';

const matchReducer = (state, action) => {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
  switch (action.type) {
    case matchActions.TOGGLE_VIEW_MATCH_REGIST_MODAL:
      return {
        ...state,
        isViewRegistModal: !state.isViewRegistModal,
      };
    case matchActions.INSERT_SELECT_DISTRICT: {
      const { districtMarker, curDistrictName } = action.payload;
      const newMarkers = { ...state.selectedDistricts };
      newMarkers[curDistrictName] = districtMarker;
      return {
        ...state,
        selectedDistricts: newMarkers,
      };
    }
    case matchActions.DELETE_SELECT_DISTRICT: {
      const { curDistrictName } = action.payload;
      const newMarkers = {};
      Object.entries(state.selectedDistricts).forEach(([name, marker]) => {
        if (name !== curDistrictName) {
          newMarkers[name] = marker;
        }
      });
      return {
        ...state,
        selectedDistricts: newMarkers,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default matchReducer;
