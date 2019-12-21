import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MatchCard from '../MatchCard';
import useAsync from '../../../hooks/useAsync';
import { FilterContext } from '../../../contexts/Filter';
import { MatchContext } from '../../../contexts/Match';
import { FetchLoadingView, FetchErrorView } from '../../../template';
import './index.scss';

const MATCH_LIST_COUNT_PER_PAGE = 10;
const MATCH_LIST_FETCH_QUERY = `
query ($first: Int, $skip: Int, $startTime: String, $endTime: String, $date: String, $area: [Area]){
  PendingMatches(first: $first, skip: $skip, area: $area, startTime: $startTime, endTime: $endTime, date: $date){
    seq
    author {
      seq
      playerId
      name
      phone
      email
    }
    host{
      seq
      name
      logo
      introduction
    }
    address
    area
    stadium
    date
    startTime
    endTime
    description
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

const renderingMatchListView = (listState, reFetchList, currentList) => {
  const { loading, data: matchList, error } = listState;
  if (loading) return FetchLoadingView();
  if (error) return FetchErrorView(reFetchList, LIST_FETCH_ERROR_MSG);
  if (!matchList) return [];
  //const newList = [...currentList, ...matchList];
  if (currentList.length === 0) return NoListView();
  return ListView(currentList);
};

const getSelectedDistrictArray = (districtInfo) => {
  let newArr = Object.keys(districtInfo).filter(
    (districtCode) => districtInfo[districtCode].isSelected
  );
  if (newArr.length === 0) newArr = undefined;
  return newArr;
};

const createQueryBaseOnState = (filter, districtInfo, page) => {
  const queryValue = {
    query: MATCH_LIST_FETCH_QUERY,
    variables: {
      startTime: filter.startTime,
      endTime: filter.endTime,
      date: filter.matchDay.format('YYYY[-]MM[-]DD'),
      area: getSelectedDistrictArray(districtInfo),
      skip: page * MATCH_LIST_COUNT_PER_PAGE,
      first: MATCH_LIST_COUNT_PER_PAGE,
    },
  };
  return queryValue;
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
  const [currentPage, setPage] = useState(0);
  const [currentList, setMatchList] = useState([]);
  const [pageEnd, setPageEnd] = useState(false);

  useEffect(() => {
    setPage(0);
    setPageEnd(false);
    setMatchList([]);
  }, [filterState, matchState.districtInfo]);

  const [listState, reFetchList] = useAsync(
    getMatchList.bind(null, fetchQuery),
    [fetchQuery]
  );

  useEffect(() => {
    if (!matchState.districtInfo) return null;
    setFetchQuery(
      createQueryBaseOnState(filterState, matchState.districtInfo, currentPage)
    );
  }, [filterState, matchState.districtInfo, currentPage]);

  useEffect(() => {
    if (!listState.data) return;
    if (listState.data.length < MATCH_LIST_COUNT_PER_PAGE) setPageEnd(true);
    setMatchList([...currentList, ...listState.data]);
  }, [listState.data]);

  const handleFetchMore = () => {
    setPage(currentPage + 1);
  };

  const moreButton = pageEnd ? null : (
    <button type="button" className="fetch-more__btn" onClick={handleFetchMore}>
      더 불러오기
    </button>
  );
  return (
    <>
      <div className="match-list">
        {renderingMatchListView(listState, reFetchList, currentList)}
      </div>
      <div className="fetch-more">{moreButton}</div>
    </>
  );
};

export default MatchList;
