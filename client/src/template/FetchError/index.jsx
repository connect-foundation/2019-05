import React from 'react';

const FetchErrorView = (refetch, contents) => {
  return (
    <>
      <span>{contents}</span>
      <button type="button" onClick={refetch}>
        다시 불러오기
      </button>
    </>
  );
};

export default FetchErrorView;
