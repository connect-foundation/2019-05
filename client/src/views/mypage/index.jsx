import React from 'react';
import { Header, SideBar } from '../../components/common';
import { UserInfoForm } from '../../components/mypage';

const mypage = () => {
  return (
    <div className="mypage">
      <SideBar />
      <Header />
      <UserInfoForm />
    </div>
  );
};

export default mypage;
