import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import useAsync from '../../hooks/useAsync';
import { Header, SideBar } from '../../components/common';
import {
  TeamIntroduction,
  TeamMembers,
  TeamMatchList,
} from '../../components/myteam';
import { UserContext } from '../../contexts/User';
import { FetchLoadingView, FetchErrorView } from '../../template';
import { MYTEAM_INFO_FETCH_QUERY } from '../../util/query';

const FETCH_ERROR_MSG = '팀정보 불러오기를 실패했습니다..';

const getTeamData = async (playerInfo) => {
  if (!playerInfo) return;
  const fetchBody = {
    query: MYTEAM_INFO_FETCH_QUERY,
    variables: {
      seq: playerInfo.team.seq,
      date: moment().format('YYYY[-]MM[-]DD'),
    },
  };
  const fetchOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fetchBody),
  };
  const data = await fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, fetchOption);
  const result = await data.json();
  return result.data;
};

const Myteam = () => {
  const { userState } = useContext(UserContext);

  const [teamFetchData, reFetch] = useAsync(
    getTeamData.bind(null, userState.playerInfo),
    [userState.playerInfo]
  );

  const {
    loading: teamDataLoading,
    data: teamData,
    error: teamError,
  } = teamFetchData;

  const [teamInfo, setTeamInfo] = useState();

  useEffect(() => {
    if (!userState.playerInfo || !teamData) return;
    setTeamInfo(teamData.Team);
  }, [teamData]);

  if (!userState.playerInfo || !userState.playerInfo.team)
    return <Redirect to="/" />;
  if (teamDataLoading) return FetchLoadingView();
  if (teamError) return FetchErrorView(reFetch, FETCH_ERROR_MSG);
  if (teamDataLoading || teamError || !teamInfo) return null;
  return (
    <>
      <SideBar />
      <div className="myTeam">
        <Header />
        <TeamIntroduction teamInfo={teamInfo} setTeamInfo={setTeamInfo} />
        <TeamMembers members={teamInfo.members} />
        <TeamMatchList
          uploadMatches={teamInfo.uploadMatchList}
          applyingMatches={teamInfo.onApplyingList}
        />
      </div>
    </>
  );
};

export default Myteam;
