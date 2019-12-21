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
`;

const DELETE_NOTI_MUTATION = `
mutation($notiSeq: Int) {
  DeleteNotifier(seq: $notiSeq) {
    seq
  }
}`;

module.exports = {
  TEAM_INFO_FETCH_QUERY,
  MY_NOTIFICATIONS_QUERY,
  UPDATE_PLAYERS_TEAM_INFO,
  CREATE_TEAM,
  DELETE_NOTI_MUTATION,
};
