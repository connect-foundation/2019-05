import actions from './Actions';

const actionCreator = {
  toggleViewMatchRegistModal: () => {
    return { type: actions.TOGGLE_VIEW_MATCH_REGIST_MODAL };
  },
  toggleViewMatchApplyModal: () => {
    return { type: actions.TOGGLE_VIEW_MATCH_APPLY_MODAL };
  },
  selectMatchInfo: (selectedMatchInfo) => {
    return {
      type: actions.SELECT_MATCH_INFO,
      payload: { selectedMatchInfo },
    };
  },
  deselectMatchInfo: () => {
    return {
      type: actions.DESELECT_MATCH_INFO,
      payload: { selectedMatchInfo: null },
    };
  },
  clickDistrict: (clickedDName) => {
    return {
      type: actions.CLICK_DISTRICT,
      payload: { clickedDName },
    };
  },
  initialDistrict: () => {
    return { type: actions.INITIALIZE_DISTRICT };
  },
};

export default actionCreator;
