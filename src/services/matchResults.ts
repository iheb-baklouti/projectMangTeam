import { request } from './request';
import apiClient from './apiClient';
import { MatchResult } from '../types';
export const getAllMatchResults = () => request(apiClient.get('/match-results'));
export const createMatchResult = (data: MatchResult) => request(apiClient.post('/match-results', data));
export const updateFootballMatchResult = (id: string, data: MatchResult) =>
  request(apiClient.put(`/match-results/football/${id}`, data));
export const deleteMatchResult = (id: string) => request(apiClient.delete(`/match-results/${id}`));