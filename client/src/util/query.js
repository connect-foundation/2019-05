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

module.exports = {
  TEAM_INFO_FETCH_QUERY,
};
