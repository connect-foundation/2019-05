import React, { useContext } from 'react';
import { MatchContext, MatchActionCreator } from '../../../contexts/Match';
import { UserContext } from '../../../contexts/User';
import plusImage from '../../../assets/images/plus_icon.png';

import './index.scss';

const MatchRegist = () => {
  const { matchDispatch } = useContext(MatchContext);
  const { userState } = useContext(UserContext);

  const handleMatchRegisterBtn = () => {
    if (!userState.playerInfo || !userState.playerInfo.team) {
      alert('팀에 가입되어 있는 회원만 매치를 등록할 수 있습니다.');
      return;
    }
    matchDispatch(MatchActionCreator.toggleViewMatchRegistModal());
  };

  return (
    <div className="match-register__btn--wrapper">
      <button
        type="button"
        className="match-register__btn"
        onClick={handleMatchRegisterBtn}
      >
        <img src={plusImage} alt="" className="plus__image" />
        <span>매치 등록</span>
      </button>
    </div>
  );
};

export default MatchRegist;
