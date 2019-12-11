import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';
import MatchCard from '../MatchCard';
import useAsync from '../../../hooks/useAsync';
import { FilterContext } from '../../../contexts/Filter/Context';
import './index.scss';

const MATCH_LIST_FETCH_QUERY = `
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

const listLoadingView = () => {
  return (
    <div className="spinner-container">
      <MDSpinner size="80px" borderSize="7px" />
    </div>
  );
};

const listErrorView = (reFetchList) => {
  return (
    <>
      <span>리스트 불러오기를 실패했습니다...</span>
      <button type="button" onClick={reFetchList}>
        리스트 다시 불러오기
      </button>
    </>
  );
};

const noSearchListView = () => {
  return <span>원하시는 조건에 맞는 경기가 없어요...</span>;
};

const successListView = (matchList) => {
  return (
    <>
      {matchList.map((match) => (
        <MatchCard key={match.seq} matchInfo={match} />
      ))}
    </>
  );
};

const renderMatchListView = (listState, reFetchList) => {
  const { loading, data: matchList, error } = listState;
  if (loading) return listLoadingView();
  if (error) return listErrorView(reFetchList);
  if (!matchList) return null;
  if (matchList.length === 0) return noSearchListView();
  return successListView(matchList);
};

const createQueryBaseOnState = (state) => {
  return {
    query: MATCH_LIST_FETCH_QUERY,
    variables: {
      startTime: state.startTime,
      endTime: state.endTime,
      date: state.matchDay.format('YYYY[-]MM[-]DD'),
    },
  };
};

const getMatchList = async (fetchQuery) => {
  if (!fetchQuery) return null;
  const response = await axios({
    method: 'post',
    url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(fetchQuery),
  });
  return response.data.data.PendingMatches;
};

const MatchList = () => {
  const { filterState } = useContext(FilterContext);
  const [fetchQuery, setFetchQuery] = useState(null);

  useEffect(() => {
    setFetchQuery(createQueryBaseOnState(filterState));
  }, [filterState]);

  const [listState, reFetchList] = useAsync(
    getMatchList.bind(null, fetchQuery),
    [fetchQuery]
  );

  return (
    <div className="match-list">
      {renderMatchListView(listState, reFetchList)}
    </div>
  );
};

export default MatchList;
