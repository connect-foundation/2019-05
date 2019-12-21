import axios from 'axios';
import {
  TEAM_INFO_FETCH_QUERY,
  MY_NOTIFICATIONS_QUERY,
  DELETE_NOTI_MUTATION,
} from './query';

const CONFIG = { headers: { 'Content-Type': 'application/json' } };
const API_URL = process.env.REACT_APP_GRAPHQL_ENDPOINT;
const makeFetchBody = (query, variable) => ({
  query,
  variables: {
    ...variable,
  },
});

const updatePlayerInfo = async (playerId) => {
  if (!playerId) return;
  const fetchBody = makeFetchBody(TEAM_INFO_FETCH_QUERY, { playerId });
  const { data } = await axios.post(API_URL, JSON.stringify(fetchBody), CONFIG);
  const [realInfo] = data.data.Players;
  return realInfo;
};

const getNotiList = async (playerSeq) => {
  const fetchBody = makeFetchBody(MY_NOTIFICATIONS_QUERY, { playerSeq });
  const { data } = await axios.post(API_URL, JSON.stringify(fetchBody), CONFIG);
  const notiList = data.data.Notifiers;
  return notiList;
};

const deleteNotification = async (notiSeq) => {
  const fetchBody = makeFetchBody(DELETE_NOTI_MUTATION, { notiSeq });
  const { data } = await axios.post(API_URL, JSON.stringify(fetchBody), CONFIG);
  const result = data;
  return result;
};

export { updatePlayerInfo, getNotiList, deleteNotification };
