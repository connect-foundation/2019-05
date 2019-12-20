import axios from 'axios';
import { TEAM_INFO_FETCH_QUERY, MY_NOTIFICATIONS_QUERY } from './query';

const CONFIG = { headers: { 'Content-Type': 'application/json' } };
const API_URL = process.env.REACT_APP_GRAPHQL_ENDPOINT;
const makeFetchBody = (query, variable) => ({
  query,
  variables: {
    variable,
  },
});

const updatePlayerInfo = async (playerId) => {
  if (!playerId) return;
  const fetchBody = {
    query: TEAM_INFO_FETCH_QUERY,
    variables: {
      playerId,
    },
  };
  const { data } = await axios.post(API_URL, JSON.stringify(fetchBody), CONFIG);
  const [realInfo] = data.data.Players;
  return realInfo;
};

const getNotiList = async (playerSeq) => {
  const fetchBody = {
    query: MY_NOTIFICATIONS_QUERY,
    variables: {
      playerSeq,
    },
  };
  const { data } = await axios.post(API_URL, JSON.stringify(fetchBody), CONFIG);
  console.log(data);
  const notiList = data.data.Notifiers;
  return notiList;
};

export { updatePlayerInfo, getNotiList };
