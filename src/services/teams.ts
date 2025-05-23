import { Team, ApiResponse } from '../types';
import { request } from './apiClient';

interface TeamsResponse {
  teams: Team[];
  total: number;
}

export const teamsService = {
  getAllTeams: async (associationId: string): Promise<ApiResponse<TeamsResponse>> => {
    return request<ApiResponse<TeamsResponse>>({
      method: 'GET',
      url: `/team?associationId=${associationId}`,
    });
  },

  getTeamById: async (
    id: string,
    associationId: string
  ): Promise<ApiResponse<TeamsResponse>> => {
    return request<ApiResponse<TeamsResponse>>({
      method: 'GET',
      url: `/team`,
      params: { id, associationId },
    });
  },

  createTeam: async (teamData: Partial<Team>): Promise<ApiResponse<Team>> => {
    return request<ApiResponse<Team>>({
      method: 'POST',
      url: '/team',
      data: teamData,
    });
  },

  updateTeam: async (id: string, teamData: Partial<Team>): Promise<ApiResponse<Team>> => {
    return request<ApiResponse<Team>>({
      method: 'PUT',
      url: `/team/${id}`,
      data: teamData,
    });
  },

  deleteTeam: async (id: string): Promise<ApiResponse<void>> => {
    return request<ApiResponse<void>>({
      method: 'DELETE',
      url: `/team/${id}`,
    });
  },

  updateTeamPlayers: async (id: string, playerIds: string[]): Promise<ApiResponse<Team>> => {
    return request<ApiResponse<Team>>({
      method: 'PUT',
      url: `/team/${id}/players`,
      data: { playerIds },
    });
  },

  getTeamsFiltered: async (params: Record<string, any>): Promise<ApiResponse<TeamsResponse>> => {
  return request<ApiResponse<TeamsResponse>>({
    method: 'GET',
    url: '/team',
    params,
  });
},

};
