import React, { useContext, useRef } from 'react';
import sanitizeHtml from 'sanitize-html';
import TextInputSection from '../TextInputSection';
import { UserActionCreator, UserContext } from '../../../contexts/User';
import { UPDATE_PLAYERS_TEAM_INFO } from '../../../util/query';

const TeamCodeForm = ({ handleCancel }) => {
  const { userState, userDispatch } = useContext(UserContext);
  const formRef = useRef();
  const makeFormData = () => {
    return new FormData(formRef.current);
  };
  const fetchToUpdatePlayersTeamInfo = async () => {
    const teamCodeData = makeFormData();
    const fetchBody = {
      query: UPDATE_PLAYERS_TEAM_INFO,
      variables: {
        seq: userState.playerInfo.seq,
        teamUniqueId: sanitizeHtml(teamCodeData.get('teamCode')),
      },
    };
    const fetchOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchBody),
    };
    const data = await fetch(
      process.env.REACT_APP_GRAPHQL_ENDPOINT,
      fetchOption
    );
    const result = await data.json();

    if (result.error) return false;
    return result.data.UpdatePlayersTeamInfo;
  };

  const submitEventHandler = async (e) => {
    e.preventDefault();
    const result = await fetchToUpdatePlayersTeamInfo();
    if (!result) return alert('존재하지 않는 팀코드입니다.');
    alert('내 팀 등록이 완료 되었습니다.');
    userDispatch(UserActionCreator.setIsUpdateTeamCode());
  };

  return (
    <form
      className="team-code-form"
      onSubmit={submitEventHandler}
      name="teamCodeForm"
      id="teamCodeForm"
      ref={formRef}
    >
      <TextInputSection
        title="팀 코드"
        idText="teamCode"
        required={Boolean(true)}
      />
      <div className="form-buttons">
        <button type="submit" className="btn child-btn">
          등록하기
        </button>
        <button type="button" className="btn child-btn" onClick={handleCancel}>
          취소
        </button>
      </div>
    </form>
  );
};

export default TeamCodeForm;
