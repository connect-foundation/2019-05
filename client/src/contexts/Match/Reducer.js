import actions from './Actions';
import {
  findDistrictToName,
  changeDistrictInfo,
  initializeDistrict,
  getDistrict,
} from '../../util';

const Reducer = (state, action) => {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
  switch (action.type) {
    case actions.TOGGLE_VIEW_MATCH_REGIST_MODAL:
      return {
        ...state,
        isViewRegistModal: !state.isViewRegistModal,
      };
    case actions.TOGGLE_VIEW_MATCH_APPLY_MODAL:
      return {
        ...state,
        isViewApplyModal: !state.isViewApplyModal,
      };
    case actions.SELECT_MATCH_INFO:
    case actions.DESELECT_MATCH_INFO: {
      const { selectedMatchInfo } = action.payload;
      return {
        ...state,
        selectedMatchInfo,
      };
    }
    case actions.CLICK_DISTRICT: {
      const { clickedDName } = action.payload;
      const selected = { ...findDistrictToName(clickedDName) };
      selected.isSelected = !selected.isSelected;
      changeDistrictInfo(selected);
      return {
        ...state,
        districtInfo: getDistrict(),
      };
    }
    case actions.INITIALIZE_DISTRICT: {
      initializeDistrict();
      return {
        ...state,
        districtInfo: getDistrict(),
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default Reducer;
