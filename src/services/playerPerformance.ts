import { request } from './request';
import apiClient from './apiClient';
export const getAllPlayerPerformances = () => request(apiClient.get('/player-performance'));
export const getTeamPlayersLeaguePerformances = (teamId: string) =>
  request(apiClient.get(`/player-performance/team/${teamId}`));
export const getLeagueTopPlayers = () => request(apiClient.get('/player-performance/top-players'));
export const getPlayerMarketValue = (playerId: string) =>
  request(apiClient.get(`/player-performance/${playerId}/market-value`));