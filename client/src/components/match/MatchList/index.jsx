import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MatchCard from '../MatchCard';
import useAsync from '../../../hooks/useAsync';
import { FilterContext } from '../../../contexts/Filter';
import { MatchContext } from '../../../contexts/Match';
import { FetchLoadingView } from '../../../template';
import { MATCH_LIST_FETCH_QUERY } from '../../../util/query';
import './index.scss';

const MATCH_LIST_COUNT_PER_PAGE = 10;

const NO_MATCHED_LIST_MSG = `원하시는 조건에 맞는 경기가 없어요
  경기를 등록하거나 다른 날짜, 시간을 찾아보시는 것은 어떨까요? :)`;

const getSelectedDistrictArray = (districtInfo) => {
  let newArr = Object.keys(districtInfo).filter(
    (districtCode) => districtInfo[districtCode].isSelected
  );
  if (newArr.length === 0) newArr = undefined;
  return newArr;
};

const createQueryBaseOnState = (filter, districtInfo, page) => {
  return {
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
  return response.data.data;
};

const MatchList = () => {
  const { filterState } = useContext(FilterContext);
  const { matchState } = useContext(MatchContext);
  const [fetchQuery, setFetchQuery] = useState(null);
  const [currentPage, setPage] = useState(0);
  const [currentList, setMatchList] = useState(null);
  const [isPageEnd, setPageEnd] = useState(false);
  const [prevList, setPrevList] = useState([]);

  useEffect(() => {
    setPage(0);
    setPageEnd(false);
    setMatchList((prev) => {
      if (prev) setPrevList([...prev]);
      return [];
    });
  }, [filterState, matchState.districtInfo]);

  useEffect(() => {
    if (!matchState.districtInfo) return;
    setFetchQuery(
      createQueryBaseOnState(filterState, matchState.districtInfo, currentPage)
    );
  }, [filterState, matchState.districtInfo, currentPage]);

  const [listState] = useAsync(getMatchList.bind(null, fetchQuery), [
    fetchQuery,
  ]);
  const { loading, data: matchData } = listState;

  useEffect(() => {
    if (!matchData) return;
    const {
      PendingMatches: matchList,
      MatchConnection: { hasNext },
    } = matchData;
    setPageEnd(!hasNext);
    setMatchList((prev) => {
      if (!prev) return [...matchList];
      if (currentPage === 0) {
        if (prev.length > 0) return [...prev];
        return [...matchList];
      }
      return [...prev, ...matchList];
    });
  }, [matchData]);

  const handleFetchMore = () => {
    setPage(currentPage + 1);
  };

  return (
    <div className="match-list">
      {(() => {
        if (!currentList || !prevList) {
          return null;
        }
        if (prevList.length > 0 && currentList.length === 0) {
          const view = prevList.map((match) => (
            <MatchCard key={match.seq} matchInfo={match} />
          ));
          if (!isPageEnd) {
            view.push(
              <MoreButton key="more-btn" handleFetchMore={handleFetchMore} />
            );
          }
          return view;
        }
        if (currentList.length === 0 && prevList.length === 0) {
          if (loading) {
            return FetchLoadingView();
          }
          return <span className="no-list-view">{NO_MATCHED_LIST_MSG}</span>;
        }
        const view = currentList.map((match) => (
          <MatchCard key={match.seq} matchInfo={match} />
        ));
        if (currentList.length > 0 && loading) {
          view.push(FetchLoadingView());
        }
        if (!isPageEnd) {
          view.push(
            <MoreButton key="more-btn" handleFetchMore={handleFetchMore} />
          );
        }
        return view;
      })()}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const MoreButton = ({ handleFetchMore }) => {
  return (
    <div className="fetch-more__wrraper">
      <button
        type="button"
        className="fetch-more__btn"
        onClick={handleFetchMore}
      >
        <span className="fet-more__btn--span">매치 더보기</span>
      </button>
    </div>
  );
};

export default MatchList;
