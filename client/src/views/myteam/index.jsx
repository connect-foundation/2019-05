import React from 'react';
import { Header, Footer } from '../../components/common';
import { TeamIntroduction } from '../../components/myteam';

const gql = `{
  Team(seq:5){
    name
    logo
    homeArea
    introduction
    teamUniqueId
    members{
      seq
      name
      phone
    }
    uploadMatchList{
      stadium
      address
      area
      date
      startTime
      endTime
    }
    onApplyingList {
      match {
        host {
          name
        }
        stadium
        address
        area
        date
        startTime
        endTime
      }
    }
  }
}`;

const Myteam = () => (
  <div className="myTeam">
    <Header />
    <TeamIntroduction />
    <Footer />
  </div>
);

export default Myteam;
