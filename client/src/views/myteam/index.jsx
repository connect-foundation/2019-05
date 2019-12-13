import React, { useState, useEffect } from 'react';
import useAsync from '../../hooks/useAsync';
import { Header, Footer } from '../../components/common';
import { TeamIntroduction } from '../../components/myteam';

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
    }
    uploadMatchList{
      stadium
      address
      area
      date
      startTime
      endTime
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

const getTeamData = async () => {
  const fetchBody = {
    query: gql,
    variables: {
      seq: 5,
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
  const [teamFetchData, reFetchTeamData] = useAsync(getTeamData, []);
  const {
    loading: teamDataLoading,
    data: teamData,
    error: teamError,
  } = teamFetchData;
  const [teamInfo, setTeamInfo] = useState();
  useEffect(() => {
    if (!teamData) return;
    setTeamInfo(teamData.Team);
  }, [teamData]);
  if (teamDataLoading || teamError) return null;
  return (
    <div className="myTeam">
      <Header />
      <TeamIntroduction teamInfo={teamInfo} setTeamInfo={setTeamInfo} />
    </div>
  );
};

export default Myteam;
