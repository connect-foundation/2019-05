import React, { useState, useEffect, useContext } from 'react';
import MatchCard from '../MatchCard';
import { FilterContext } from '../../../contexts/Filter';
import './index.scss';

const INIT_MATCH_LIST_FETCH_QUERY = `
query ($startTime: String, $endTime: String, $date: String){
  PendingMatches(first:20, startTime: $startTime, endTime: $endTime, date: $date){
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
  const { filterState } = useContext(FilterContext);
  const [matchList, setMatchList] = useState([]);
  const [fetchQuery, setFetchQuery] = useState({
    query: INIT_MATCH_LIST_FETCH_QUERY,
    variables: {
      startTime: filterState.startTime,
      endTime: filterState.endTime,
      date: filterState.matchDay.format('YYYY[-]MM[-]DD'),
    },
  });
  useEffect(() => {
    setFetchQuery({
      query: INIT_MATCH_LIST_FETCH_QUERY,
      variables: {
        startTime: filterState.startTime,
        endTime: filterState.endTime,
        date: filterState.matchDay.format('YYYY[-]MM[-]DD'),
      },
    });
  }, [filterState]);
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
      {matchList && matchList.length > 0 ? (
        matchList.map((match) => (
          <MatchCard key={match.seq} matchInfo={match} />
        ))
      ) : (
        <span>원하시는 조건에 맞는 경기가 없어요! </span>
      )}
    </div>
  );
};

export default MatchList;
