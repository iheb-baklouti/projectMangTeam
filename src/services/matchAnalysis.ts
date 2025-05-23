import apiClient from './apiClient';
import { request } from './request';

export const getMatchAnalyses = () => request(apiClient.get('/match-analysis'));
export const getTeamMatchHistory = (teamId: string) => request(apiClient.get(`/match-analysis/history/${teamId}`));
export const getManOfTheMatch = (matchId: string) => request(apiClient.get(`/match-analysis/${matchId}/motm`));