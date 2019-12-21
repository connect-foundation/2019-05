import React from 'react';

import './index.scss';

const TeamMembers = ({ members }) => {
  if (!members) return null;
  const makeMemberInfoRows = (members) => {
    if (members.length === 0)
      return (
        <tr>
          <td colSpan="4">소속된 회원이 없습니다.</td>
        </tr>
      );

    return members.map((val, idx) => {
      return (
        <tr key={val.seq}>
          <td>{idx + 1}</td>
          <td>{val.name}</td>
          <td>{val.phone}</td>
          <td>{val.email}</td>
        </tr>
      );
    });
  };
  return (
    <div className="team-members">
      <div className="grid-container">
        <h2>멤버 리스트</h2>
        <div className="members-list">
          <table className="quickkick-table">
            <thead>
              <tr>
                <th>순서</th>
                <th>이름</th>
                <th>전화번호</th>
                <th>이메일</th>
              </tr>
            </thead>
            <tbody>{makeMemberInfoRows(members)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
