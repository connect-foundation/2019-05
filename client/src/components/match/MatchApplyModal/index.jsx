import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { MatchActionCreator, MatchContext } from '../../../contexts/Match';
import { post } from '../../../util/requestOptionCreator';
import './index.scss';

const GET_SUBSCRIPTION_REQUEST_URL = `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/findSubscription`;
const SEND_NOTIFICATION_REQUEST_URL = `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/sendNotification`;

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

const getSubscription = async (hostId) => {
  const subscription = await axios(
    post(GET_SUBSCRIPTION_REQUEST_URL, {
      userId: hostId,
    })
  );
  return subscription.data.subscription;
};

const ApplyButton = (props) => {
  // eslint-disable-next-line react/prop-types
  const { matchInfo } = props;
  const handleApplyBtn = async () => {
    // eslint-disable-next-line react/prop-types
    const hostId = matchInfo.author.playerId;
    const subscription = await getSubscription(hostId);
    try {
      await axios(
        post(SEND_NOTIFICATION_REQUEST_URL, {
          matchInfo,
          subscription,
        })
      );
    } catch (error) {
      console.log(error);
    }
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
