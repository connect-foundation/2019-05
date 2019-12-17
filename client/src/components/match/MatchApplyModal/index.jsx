import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { MatchActionCreator, MatchContext } from '../../../contexts/Match';
import './index.scss';

const ModalHeader = () => {
  const { matchDispatch } = useContext(MatchContext);
  const handleCloseBtn = () => {
    matchDispatch(MatchActionCreator.toggleViewMatchApplyModal());
    matchDispatch(MatchActionCreator.deselectMatchInfo());
  };

  return (
    <div className="modal-header">
      <div className="title">
        <p>매치 신청</p>
      </div>
      <div className="close-btn">
        <button type="button" onClick={handleCloseBtn}>
          <FontAwesomeIcon icon={faTimesCircle} size="2x" />
        </button>
      </div>
    </div>
  );
};

const MatchTeamInfoSection = () => {
  const { matchState } = useContext(MatchContext);
  const [matchInfo, setMatchInfo] = useState(null);
  const [hostInfo, setHostInfo] = useState(null);

  useEffect(() => {
    if (!matchState.selectedMatchInfo) return;
    setMatchInfo(matchState.selectedMatchInfo);
    setHostInfo(matchState.selectedMatchInfo.host);
  }, [matchState.selectedMatchInfo]);

  return (
    <div className="modal-main-section">
      <div className="host-name-container">
        <span className="host-name">{hostInfo ? hostInfo.name : ''}</span>
      </div>
    </div>
  );
};

const getSubscription = async () => {
  const subscription = await axios(
    `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/subscription`
  );
  return subscription.data.subscription;
};

const ApplyButton = ({ matchInfo }) => {
  const handleApplyBtn = async () => {
    const subscription = await getSubscription();
    await axios(
      `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/sendNotification`,
      {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        data: JSON.stringify({
          matchInfo,
          subscription,
        }),
      }
    );
  };
  return (
    <div>
      <button type="button" onClick={handleApplyBtn}>
        신청 하기
      </button>
    </div>
  );
};

const MatchApplyModal = () => {
  const { matchState } = useContext(MatchContext);
  const toggleModalVisible = () => {
    return matchState.isViewApplyModal ? 'visible' : '';
  };
  return (
    <div className={`match-apply-modal ${toggleModalVisible()}`}>
      <div className="modal-container">
        <ModalHeader />
        <MatchTeamInfoSection />
        <ApplyButton matchInfo={matchState.selectedMatchInfo} />
      </div>
      <div className="modal-background" />
    </div>
  );
};

export default MatchApplyModal;
