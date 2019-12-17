import React, { useState, useEffect, useContext } from 'react';
import useAsync from '../../hooks/useAsync';
import { Header, SideBar } from '../../components/common';
import {
  TeamIntroduction,
  TeamMembers,
  TeamMatchList,
} from '../../components/myteam';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/User';

const gql = `
query ($seq: Int){
  Team(seq:$seq){
    seq
    name
    logo
    homeArea
    introduction
    teamUniqueId
    members{
      seq
      name
      phone
      email
    }
    uploadMatchList{
      seq
      stadium
      address
      area
      date
      startTime
      endTime
      appliedLists {
        seq
        team{
          name
        }
      }
    }
    onApplyingList {
      match {
        host {
          name
        }
        stadium
        address
        area
        date
        startTime
        endTime
      }
    }
  }
}`;

const getTeamData = async (teamSeq) => {
  const fetchBody = {
    query: gql,
    variables: {
      seq: teamSeq,
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
  const [teamFetchData, reFetchTeamData] = useAsync(
    getTeamData.bind(null, userState.playerTeam),
    []
  );
  const {
    loading: teamDataLoading,
    data: teamData,
    error: teamError,
  } = teamFetchData;
  const [teamInfo, setTeamInfo] = useState();
  useEffect(() => {
    if (!userState.playerTeam) return;
    if (!teamData) return;
    setTeamInfo(teamData.Team);
  }, [teamData]);
  if (!userState.playerTeam) return <Redirect to="/" />;
  if (teamDataLoading) return <div>로딩중</div>;
  if (teamError) return <div>에러</div>;
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
