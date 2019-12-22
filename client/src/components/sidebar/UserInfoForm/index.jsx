import React, { useContext, useRef } from 'react';
import sanitizeHtml from 'sanitize-html';
import TextInputSection from '../TextInputSection';
import { UserActionCreator, UserContext } from '../../../contexts/User';

const gql = `
mutation ($seq: Int, $name: String, $phone: String, $email: String){
  UpdatePlayerInfo(seq: $seq, name: $name, phone: $phone, email: $email){
    seq
    name
    phone
    email
  }
}
`;

const UserInfoForm = ({ handleCancel }) => {
  const { userState, userDispatch } = useContext(UserContext);
  const formRef = useRef();
  const makeFormData = () => {
    return new FormData(formRef.current);
  };
  const fetchToUpdatePlayerInfo = async () => {
    const userInfoData = makeFormData();
    const fetchBody = {
      query: gql,
      variables: {
        seq: userState.playerInfo.seq,
        name: sanitizeHtml(userInfoData.get('name')),
        phone: sanitizeHtml(userInfoData.get('phone')),
        email: sanitizeHtml(userInfoData.get('email')),
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

    if (result.error) return false;
    return result.data.UpdatePlayerInfo;
  };

  const submitEventHandler = async (e) => {
    e.preventDefault();
    const result = await fetchToUpdatePlayerInfo();
    if (!result) return alert('유자 정보 등록에 실패하였습니다.');
    alert('유저 정보를 등록하였습니다.');
    userDispatch(UserActionCreator.setIsUpdateUserInfo());
  };

  return (
    <form
      className="user-info-form"
      onSubmit={submitEventHandler}
      name="userInfoForm"
      id="userInfoForm"
      ref={formRef}
    >
      <TextInputSection
        title="이름"
        idText="name"
        required={Boolean(true)}
      />
      <TextInputSection
        title="핸드폰"
        idText="phone"
        required={Boolean(true)}
      />
      <TextInputSection
        title="이메일"
        idText="email"
        required={Boolean(true)}
        maxlen="50"
      />
      <div className="form-buttons">
        <button type="submit" className="btn child-btn">
          등록하기
        </button>
        <button type="button" className="btn child-btn" onClick={handleCancel}>
          취소
        </button>
      </div>
    </form>
  );
};

export default UserInfoForm;
