import { request } from './request';
import apiClient from './apiClient';
import { Player } from '../types';

export const getAllPlayers = () => request(apiClient.get('/Player'));
export const createPlayer = (data: Player) => request(apiClient.post('/Player', data));
export const editPlayerById = (id: string, data: Player) => request(apiClient.put(`/Player/${id}`, data));
export const deletePlayerById = (id: string) => request(apiClient.delete(`/Player/${id}`));
