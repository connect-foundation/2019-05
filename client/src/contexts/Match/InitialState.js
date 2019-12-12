import { getDistrict } from '../../util';

const initialState = {
  isViewRegistModal: false,
  districtInfo: getDistrict(),
};

export default initialState;
