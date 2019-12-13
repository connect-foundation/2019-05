import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MatchCard from '../MatchCard';
import useAsync from '../../../hooks/useAsync';
import { FilterContext } from '../../../contexts/Filter';
import { MatchContext } from '../../../contexts/Match';
import { FetchLoadingView, FetchErrorView } from '../../../template';
import './index.scss';

const MATCH_LIST_FETCH_QUERY = `
query ($startTime: String, $endTime: String, $date: String, $area: [Area]){
  PendingMatches(first:20, area: $area, startTime: $startTime, endTime: $endTime, date: $date){
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

const LIST_FETCH_ERROR_MSG = '리스트 불러오기를 실패했습니다...';

const NoListView = () => {
  return <span>원하시는 조건에 맞는 경기가 없어요...</span>;
};

const ListView = (matchList) => {
  return (
    <>
      {matchList.map((match) => (
        <MatchCard key={match.seq} matchInfo={match} />
      ))}
    </>
  );
};

const renderingMatchListView = (listState, reFetchList) => {
  const { loading, data: matchList, error } = listState;
  if (loading) return FetchLoadingView();
  if (error) return FetchErrorView(reFetchList, LIST_FETCH_ERROR_MSG);
  if (!matchList) return [];
  if (matchList.length === 0) return NoListView();
  return ListView(matchList);
};

const getSelectedDistrictArray = (match) => {
  let newArr = Object.keys(match.districtInfo).filter((districtCode) => {
    if (match.districtInfo[districtCode].isSelected) return true;
  });
  if (newArr.length === 0) newArr = undefined;
  return newArr;
};

const createQueryBaseOnState = (filter, match) => {
  return {
    query: MATCH_LIST_FETCH_QUERY,
    variables: {
      startTime: filter.startTime,
      endTime: filter.endTime,
      date: filter.matchDay.format('YYYY[-]MM[-]DD'),
      area: getSelectedDistrictArray(match),
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
  const { matchState } = useContext(MatchContext);
  const [fetchQuery, setFetchQuery] = useState(null);

  useEffect(() => {
    setFetchQuery(createQueryBaseOnState(filterState, matchState));
  }, [filterState, matchState]);

  const [listState, reFetchList] = useAsync(
    getMatchList.bind(null, fetchQuery),
    [fetchQuery]
  );

  return (
    <div className="match-list">
      {renderingMatchListView(listState, reFetchList)}
    </div>
  );
};

export default MatchList;
