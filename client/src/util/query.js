const TEAM_INFO_FETCH_QUERY = `
  query($playerId: String) {
    Players(playerId: $playerId) {
      seq
      playerId
      name 
      phone
      email
      notiList {
        seq
        date
        startTime
      }
      team {
        logo
        seq
        name
        introduction
        onApplyingList {
         match {
           seq
         }
        }
      }
    }
  }`;

const MY_NOTIFICATIONS_QUERY = `
query($playerSeq: Int) {
  Notifiers(player: $playerSeq){
    seq
    date
    area
    startTime
    endTime
  }
}`;

const UPDATE_PLAYERS_TEAM_INFO = `
mutation ($seq: Int, $teamUniqueId: String){
  UpdatePlayersTeamInfo(seq: $seq, teamUniqueId: $teamUniqueId){
    seq
    team {
      seq
    }
  }
}
`;

const CREATE_TEAM = `
mutation($name: String, $teamUniqueId: String, $owner: Int){
  CreateTeam(name: $name, teamUniqueId: $teamUniqueId, owner: $owner){
    seq
    name
    teamUniqueId
    owner {
      seq
    }
  }
}`;

const DELETE_NOTI_MUTATION = `
mutation($notiSeq: Int) {
  DeleteNotifier(seq: $notiSeq) {
    seq
  }
}`;

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
  MatchConnection(first: $first, skip: $skip, area: $area, startTime: $startTime, endTime: $endTime, date: $date){
    hasNext
  }
}`;

const MYTEAM_INFO_FETCH_QUERY = `
query ($seq: Int, $date: String){
  Team(seq:$seq, date: $date){
    seq
    name
    logo
    homeArea
    introduction
    teamUniqueId
    members{
      seq
      name
      phone
      email
    }
    uploadMatchList{
      seq
      stadium
      address
      area
      date
      startTime
      endTime
      appliedLists {
        seq
        team{
          name
        }
        player{
          phone
          email
        }
      }
    }
    onApplyingList {
      seq
      match {
        seq
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

module.exports = {
  TEAM_INFO_FETCH_QUERY,
  MY_NOTIFICATIONS_QUERY,
  UPDATE_PLAYERS_TEAM_INFO,
  CREATE_TEAM,
  DELETE_NOTI_MUTATION,
  MATCH_LIST_FETCH_QUERY,
  MYTEAM_INFO_FETCH_QUERY,
};
