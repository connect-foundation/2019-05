import matchActions from './Actions';
import {
  findDistrictToName,
  changeDistrictInfo,
  getDistrict,
} from '../../util';

const matchReducer = (state, action) => {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
  switch (action.type) {
    case matchActions.TOGGLE_VIEW_MATCH_REGIST_MODAL:
      return {
        ...state,
        isViewRegistModal: !state.isViewRegistModal,
      };
    case matchActions.CLICK_DISTRICT: {
      const { clickedDName } = action.payload;
      const selected = { ...findDistrictToName(clickedDName) };
      selected.isSelected = !selected.isSelected;
      changeDistrictInfo(selected);
      return {
        ...state,
        districtInfo: getDistrict(),
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default matchReducer;
