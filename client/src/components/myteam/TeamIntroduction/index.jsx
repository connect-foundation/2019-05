import React, { useContext, useState, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { getDistrict, convertDistrictCode } from '../../../util';

import './index.scss';

const SEOUL_DISTRICT = getDistrict();

const TeamIntroduction = ({ teamData, reFetchTeamData }) => {
  const [modState, setModState] = useState(false);
  const teamInfoRef = {
    emblem: useRef(),
    name: useRef(),
    home: useRef(),
    intro: useRef(),
  };
  const updateTeamInfo = () => {};

  const handleModBtnClick = () => {
    if (!modState) {
      setModState(!modState);
      return;
    }
    updateTeamInfo();
    setModState(!modState);
  };

  if (!teamData) return null;
  return (
    <div className="team-introduction">
      <div className="grid-container">
        <div className="team-info__title">
          <h2>내 팀 정보</h2>
          <button
            type="button"
            className="btn__modify"
            onClick={handleModBtnClick}
          >
            {modState ? '수정 완료' : '팀 정보 수정'}
          </button>
        </div>
        <div className="team-info__container">
          <EmblemSection
            logo={teamData.Team.logo}
            name={teamData.Team.name}
            mod={modState}
            ref={teamInfoRef.emblem}
          />
          <TeamNameSection
            name={teamData.Team.name}
            home={teamData.Team.homeArea}
            intro={teamData.Team.introduction}
            mod={modState}
            ref={teamInfoRef}
          />
        </div>
      </div>
    </div>
  );
};

const EmblemSection = forwardRef(({ logo, name, mod }, ref) => {
  return (
    <div className="emblem__container">
      <div className="emblem__image">
        <img
          src={
            logo === null
              ? '/default_logo.png'
              : `https://kr.object.ncloudstorage.com/quickkick-emblem/${logo}`
          }
          alt={name}
        />
      </div>
      {mod ? (
        <div className="emblem__input">
          <input
            type="file"
            name="emblem"
            className="team-info__input"
            ref={ref}
          />
        </div>
      ) : null}
    </div>
  );
});

const TeamNameSection = forwardRef(
  (
    { name, home, intro, mod },
    { name: nameRef, home: homeRef, intro: introRef }
  ) => {
    return (
      <div className="team-name__container">
        {mod ? (
          <div>
            <input
              type="text"
              name="teamName"
              id="teamName"
              className="team-info__input"
              defaultValue={name}
              ref={nameRef}
            />
          </div>
        ) : (
          <h3 className="team-name__title">{name}</h3>
        )}
        {mod ? (
          <TeamAreaSelect home={home} ref={homeRef} />
        ) : (
          <span className="team-name__area">{convertDistrictCode(home)}</span>
        )}
        <IntroTextSection intro={intro} mod={mod} ref={introRef} />
      </div>
    );
  }
);

const TeamAreaSelect = forwardRef(({ home }, ref) => {
  return (
    <div>
      <select
        id="homeArea"
        name="homeArea"
        className="team-info__input"
        defaultValue={home}
        ref={ref}
      >
        {Object.entries(SEOUL_DISTRICT).map(([code, district]) => {
          return (
            <option key={code} value={code}>
              {district.KOR_NAME}
            </option>
          );
        })}
      </select>
    </div>
  );
});

const IntroTextSection = forwardRef(({ intro, mod }, ref) => {
  return (
    <div className="team-intro__container">
      {mod ? (
        <textarea
          name="teamIntro"
          id="teamIntro"
          defaultValue={intro}
          className="team-info__input"
          rows="6"
          ref={ref}
        />
      ) : (
        <p className="team-intro__text">{intro}</p>
      )}
    </div>
  );
});

export default TeamIntroduction;
