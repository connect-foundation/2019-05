import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../common';
import './index.scss';

const INIT_MATCH_LIST_FETCH_QUERY = `{
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
}`;

const MatchList = () => {
  const [matchList, setMatchList] = useState([]);
  const [fetchQuery, setFetchQuery] = useState({
    query: INIT_MATCH_LIST_FETCH_QUERY,
  });

  useEffect(() => {
    const fetchSetting = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchQuery),
    };
    (async () => {
      try {
        const data = await fetch('http://localhost:4000/graphql', fetchSetting);
        const result = await data.json();
        setMatchList(result.data.PendingMatches);
      } catch (error) {
        setMatchList(undefined);
      }
    })();
    return () => {
      setMatchList([]);
    };
  }, [fetchQuery]);

  return (
    <div className="match-list">
      {matchList ? (
        matchList.map((match) => (
          <MatchCard key={match.seq} matchInfo={match} />
        ))
      ) : (
        <span>리스트가 존재하지 않습니다.</span>
      )}
    </div>
  );
};

const MatchCard = (props) => {
  const { matchInfo } = props;
  return (
    <div className="match-card">
      <div className="team-info">
        <p>팀명:{matchInfo.host.name}</p>
        <p>구장:{matchInfo.stadium}</p>
        <p>날짜:{matchInfo.date}</p>
        <p>
          시간:{matchInfo.startTime}-{matchInfo.endTime}
        </p>
      </div>
      <div className="button-box">
        <Button> 전적 분석</Button>
        <Button> 매치 신청</Button>
      </div>
    </div>
  );
};

MatchCard.propTypes = {
  matchInfo: PropTypes.shape({
    host: PropTypes.shape({
      seq: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    stadium: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
  }).isRequired,
};

export default MatchList;
