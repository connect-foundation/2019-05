import React, { useState, useEffect } from 'react';
import MatchCard from '../MatchCard';
import './index.scss';

const INIT_MATCH_LIST_FETCH_QUERY = `{
  PendingMatches(first:10){
    seq
    host{
      seq
      name
      logo
    }
    area
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
        const data = await fetch(
          process.env.REACT_APP_GRAPHQL_ENDPOINT,
          fetchSetting
        );
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

export default MatchList;
