const TEAM_INFO_FETCH_QUERY = `
  query {
    Players {
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
        win
        lose
      }
    }
  }`;

module.exports = {
  TEAM_INFO_FETCH_QUERY,
};
