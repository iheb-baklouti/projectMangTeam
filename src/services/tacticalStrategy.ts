import { request } from './request';
import apiClient from './apiClient';
import { TacticalStrategy } from '../types';
export const createTacticalStrategy = (data: TacticalStrategy) => request(apiClient.post('/tactical-strategy', data));
export const getTacticalStrategies = () => request(apiClient.get('/tactical-strategy'));
export const updateTacticalStrategy = (id: string, data: TacticalStrategy) =>
  request(apiClient.put(`/tactical-strategy/${id}`, data));
export const deleteTacticalStrategy = (id: string) => request(apiClient.delete(`/tactical-strategy/${id}`));