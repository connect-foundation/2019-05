import React, { useState, useEffect } from 'react';
import { Button } from '../../common';
import './index.scss';

const MatchList = () => {

  const [ matchList, setMatchList ] = useState([]);

  const gqlQuery = {
    query: `{
      PendingMatches{
        seq
        host{
          seq
          name
        }
        stadium
        date
        startTime
        endTime
      }
    }`
  };

  const fetchList = async () => {
    const data = await fetch('http://localhost:4000/graphql',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gqlQuery)
    });
    const result = await data.json();
    if(!result.error) setMatchList(result.data.PendingMatches);
  };

  useEffect(()=>{
    fetchList();
  });

  return (
    <div className="match-list">
      {matchList.map(match => {
        return <MatchCard
          key={match.seq}
          hostSeq={match.host.seq}
          hostName={match.host.seq}
          stadium={match.stadium}
          date={match.date}
          startTime={match.startTime}
          endTime={match.endTime}
        />
      })}
    </div>
  );
};

const MatchCard = (props) => {
  const {hostSeq, hostName, stadium, date, startTime, endTime} = props;
  return (
    <div className="match-card">
      <div className="team-info">
        <p>팀명:{hostName}</p>
        <p>구장:{stadium}</p>
        <p>날짜:{date}</p>
        <p>시간:{startTime} - {endTime}</p>
      </div>
      <div className="button-box">
        <Button> 전적 분석</Button>
        <Button> 매치 신청</Button>
      </div>
    </div>
  );
};

export default MatchList;
