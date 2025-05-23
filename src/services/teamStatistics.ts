import { request } from './request';
import apiClient from './apiClient';
import { TeamStatistics } from '../types';
export const getTeamStatistics = () => request(apiClient.get('/team-statistics'));
export const createFootballTeamStatistics = (data: TeamStatistics) =>
  request(apiClient.post('/team-statistics/football', data));
export const deleteTeamStatistics = (id: string) => request(apiClient.delete(`/team-statistics/${id}`));