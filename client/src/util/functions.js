import axios from 'axios';
import { TEAM_INFO_FETCH_QUERY } from './query';

const updatePlayerInfo = async (playerId) => {
  const fetchBody = {
    query: TEAM_INFO_FETCH_QUERY,
    variables: {
      playerId,
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
