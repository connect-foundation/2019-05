import { TEAM_INFO_FETCH_QUERY } from './query';
import axios from 'axios';

const updatePlayerInfo = async (playerId) => {
  const fetchBody = {
    query: TEAM_INFO_FETCH_QUERY,
    variables: {
      playerId: playerId,
    },
  };

  const { data } = await axios.post(
    process.env.REACT_APP_GRAPHQL_ENDPOINT,
    JSON.stringify(fetchBody),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const [realInfo] = data.data.Players;
  return realInfo;
};

export default updatePlayerInfo;
