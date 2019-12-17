import { getDistrict } from '../../util';

const initialState = {
  isViewRegistModal: false,
  isViewApplyModal: false,
  selectedMatchInfo: null,
  districtInfo: getDistrict(),
};

export default initialState;
