import React, { useState, useRef, forwardRef, useContext } from 'react';
import sanitizeHtml from 'sanitize-html';
import { getDistrict, convertDistrictCode } from '../../../util';
import { UserContext } from '../../../contexts/User';
import './index.scss';

const SEOUL_DISTRICT = getDistrict();
const gql = `
mutation($seq: Int, $name: String, $logo: String, $homeArea: Area, $introduction: String){
  UpdateTeamInfo(seq: $seq, name: $name, logo: $logo, homeArea: $homeArea, introduction: $introduction){
    name
    logo
    homeArea
    introduction
  }
}`;

const TeamIntroduction = ({ teamInfo, setTeamInfo }) => {
  const [modState, setModState] = useState(false);
  const { userState } = useContext(UserContext);
  const teamInfoRef = {
    seq: useRef(),
    emblem: useRef(),
    name: useRef(),
    home: useRef(),
    intro: useRef(),
  };
  const makeFormData = () => {
    const teamInfoForm = new FormData();
    Object.entries(teamInfoRef).forEach((ref) => {
      const refValue =
        ref[0] === 'emblem'
          ? ref[1].current.files[0]
          : sanitizeHtml(ref[1].current.value);
      teamInfoForm.append(ref[1].current.name, refValue);
    });
    return teamInfoForm;
  };
  const updateEmblemImage = async (formData) => {
    if (formData.get('emblem') === 'undefined') return false;
    const response = await fetch(
      process.env.REACT_APP_API_SERVER_ADDRESS + '/myteam/emblem',
      {
        method: 'POST',
        body: formData,
      }
    );
    const imgUploadResult = await response.json();
    return imgUploadResult;
  };
  const updateTeamInfo = async () => {
    const teamInfoForm = makeFormData();
    const imgUploadResult = await updateEmblemImage(teamInfoForm);
    if (imgUploadResult.result === 'error') {
      const msg =
        typeof imgUploadResult.msg === 'string'
          ? imgUploadResult.msg
          : '이미지 업로드에 문제가 발생했습니다. 다시 시도해주세요.';
      alert(msg);
      return false;
    }

    const fetchBody = {
      query: gql,
      variables: {
        seq: userState.playerInfo.team.seq,
        name: teamInfoForm.get('teamName'),
        logo: imgUploadResult ? imgUploadResult.name : undefined,
        homeArea: teamInfoForm.get('homeArea'),
        introduction: teamInfoForm.get('teamIntro'),
      },
    };
    const fetchOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchBody),
    };
    const data = await fetch(
      process.env.REACT_APP_GRAPHQL_ENDPOINT,
      fetchOption
    );
    const result = await data.json();
    return result.data.UpdateTeamInfo;
  };

  const handleModBtnClick = async () => {
    if (!modState) {
      setModState(!modState);
      return;
    }
    const uploadResult = await updateTeamInfo();
    setTeamInfo({
      ...teamInfo,
      name: uploadResult.name,
      logo: uploadResult.logo,
      homeArea: uploadResult.homeArea,
      introduction: uploadResult.introduction,
    });
    setModState(!modState);
  };

  const handleCancelBtnClick = () => {
    setModState(!modState);
  };

  if (!teamInfo) return null;
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
          {modState ? (
            <button
              type="button"
              className="btn__modify"
              onClick={handleCancelBtnClick}
            >
              취소
            </button>
          ) : null}
        </div>
        <div className="team-info__container">
          <input
            type="hidden"
            name="seq"
            value={teamInfo.seq}
            ref={teamInfoRef.seq}
          />
          <EmblemSection
            logo={teamInfo.logo}
            name={teamInfo.name}
            mod={modState}
            ref={teamInfoRef.emblem}
          />
          <TeamNameSection
            name={teamInfo.name}
            home={teamInfo.homeArea}
            intro={teamInfo.introduction}
            teamUniqueId={teamInfo.teamUniqueId}
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
    { name, home, intro, teamUniqueId, mod },
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
          <span className="team-name__area">
            {home ? convertDistrictCode(home) : ''}
          </span>
        )}
        <p className="team-uniqueId">
          <span className="team-uniqueId__title">TeamId:</span> {teamUniqueId}
          <span className="team-uniqueId__inform">
            (다른 팀원이 이 id를 입력하여 팀에 가입할 수 있습니다.)
          </span>
        </p>
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
