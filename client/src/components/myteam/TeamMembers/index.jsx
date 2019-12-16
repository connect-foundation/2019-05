import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TeamMembers = ({ members }) => {
  if (!members) return null;
  return (
    <div className="team-members">
      <div className="grid-container">
        <h2>야 여기가 멤버가 들어올 자리야</h2>
        <div className="members-list">
          <ul>
            {members.map((val) => {
              return <li key={val.seq}>{val.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
