import { request } from './request';
import apiClient from './apiClient';
export const getPlayerStatistics = () => request(apiClient.get('/player-statistics'));
export const getPlayerRecommendations = () => request(apiClient.get('/player-statistics/recommendations'));
export const comparePlayerStatistics = (player1Id: string, player2Id: string) =>
  request(apiClient.get(`/player-statistics/compare?player1=${player1Id}&player2=${player2Id}`));
export const getPlayerRanking = () => request(apiClient.get('/player-statistics/ranking'));
export const getTopScorers = () => request(apiClient.get('/player-statistics/top-scorers'));
export const getTopAssists = () => request(apiClient.get('/player-statistics/top-assists'));