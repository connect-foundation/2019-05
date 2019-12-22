import React, { useRef, useContext } from 'react';
import sanitizeHtml from 'sanitize-html';
import uuidv4 from 'uuid';
import { UserActionCreator, UserContext } from '../../../contexts/User';
import TextInputSection from '../TextInputSection';
import { CREATE_TEAM, UPDATE_PLAYERS_TEAM_INFO } from '../../../util/query';

const TeamCreationForm = ({ handleCancel }) => {
  const { userState, userDispatch } = useContext(UserContext);
  let teamUniqueId;
  const formRef = useRef();
  const makeFormData = () => {
    return new FormData(formRef.current);
  };
  const fetchToCreateTeam = async () => {
    const teamCreationForm = makeFormData();
    const fetchBody = {
      query: CREATE_TEAM,
      variables: {
        name: sanitizeHtml(teamCreationForm.get('teamName')),
        teamUniqueId: uuidv4().substr(0, 8),
        owner: userState.playerInfo.seq,
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
    return result.data.CreateTeam;
  };

  const fetchToUpdatePlayersTeamInfo = async () => {
    const fetchBody = {
      query: UPDATE_PLAYERS_TEAM_INFO,
      variables: {
        seq: userState.playerInfo.seq,
        teamUniqueId,
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
    const team = await fetchToCreateTeam();
    if (!team) return alert('팀 생성에 실패하였습니다.');
    teamUniqueId = team.teamUniqueId;
    await fetchToUpdatePlayersTeamInfo(teamUniqueId);
    alert('팀 생성이 완료 되었습니다.');
    userDispatch(UserActionCreator.setIsUpdateTeamCode());
  };

  return (
    <form
      className="team-code-form"
      onSubmit={submitEventHandler}
      name="teamCreationForm"
      id="teamCreationForm"
      ref={formRef}
    >
      <TextInputSection
        title="팀 이름"
        idText="teamName"
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

export default TeamCreationForm;
