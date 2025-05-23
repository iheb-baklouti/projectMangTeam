import { request } from './request';
import apiClient from './apiClient';
export const getTeamPerformances = () => request(apiClient.get('/team-performance'));
export const getProgression = (teamId: string) => request(apiClient.get(`/team-performance/${teamId}/progression`));
export const getStrengthsWeaknesses = (teamId: string) =>
  request(apiClient.get(`/team-performance/${teamId}/swot`));