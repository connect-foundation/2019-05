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

module.exports = {
  TEAM_INFO_FETCH_QUERY,
  MY_NOTIFICATIONS_QUERY,
};
