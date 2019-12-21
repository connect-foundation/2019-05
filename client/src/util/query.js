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

const DELETE_NOTI_MUTATION = `
mutation($notiSeq: Int) {
  DeleteNotifier(seq: $notiSeq) {
    seq
  }
}`;

module.exports = {
  TEAM_INFO_FETCH_QUERY,
  MY_NOTIFICATIONS_QUERY,
  DELETE_NOTI_MUTATION,
};
