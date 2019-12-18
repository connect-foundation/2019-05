import React, { useContext, useRef } from 'react';
import sanitizeHtml from 'sanitize-html';
import TextInputSection from '../TextInputSection';
import { UserContext } from '../../../contexts/User';

const gql = `
mutation ($seq: Int, $teamUniqueId: String){
  UpdatePlayersTeamInfo(seq: $seq, teamUniqueId: $teamUniqueId){
    seq
    team {
      seq
    }
  }
}
`;

const TeamCodeForm = () => {
  const { userState } = useContext(UserContext);
  const formRef = useRef();
  const makeFormData = () => {
    return new FormData(formRef.current);
  };
  const fetchToUpdatePlayersTeamInfo = async () => {
    const teamCodeData = makeFormData();
    const fetchBody = {
      query: gql,
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
      <button type="submit" className="submit-btn">
        등록하기
      </button>
    </form>
  );
};

export default TeamCodeForm;
