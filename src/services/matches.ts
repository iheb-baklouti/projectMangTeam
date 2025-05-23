import { Match, ApiResponse, PaginatedResponse, MatchResult } from '../types';
import { request } from './apiClient';
  interface MatchesResponse {
    matches: Match[];
    total: number;
  }
export const matchesService = {

  getAllMatches: async (associationId: string): Promise<ApiResponse<MatchesResponse>> => {
    return request<ApiResponse<MatchesResponse>>({
      method: 'GET',
      url: `/matches?associationId=${associationId}`,
    });
  },


 getMatchById: async (associationId: string, matchId: string): Promise<ApiResponse<Match>> => {
  return request<ApiResponse<Match>>({
    method: 'GET',
    url: `/matches`,
    params: { associationId , matchId},
  });
},

  
  createMatch: async (matchData: Partial<Match>): Promise<ApiResponse<Match>> => {
    return request<ApiResponse<Match>>({
      method: 'POST',
      url: '/matches',
      data: matchData,
    });
  },
  
  updateMatch: async (id: string, matchData: Partial<Match>): Promise<ApiResponse<Match>> => {
    return request<ApiResponse<Match>>({
      method: 'PUT',
      url: `/matches/${id}`,
      data: matchData,
    });
  },
  
  deleteMatch: async (id: string): Promise<ApiResponse<void>> => {
    return request<ApiResponse<void>>({
      method: 'DELETE',
      url: `/matches/${id}`,
    });
  },
  
  updateMatchStatus: async (id: string, status: string): Promise<ApiResponse<Match>> => {
    return request<ApiResponse<Match>>({
      method: 'PATCH',
      url: `/matches/${id}/status`,
      data: { status },
    });
  },
  
  // Match Results
  getAllMatchResults: async (): Promise<ApiResponse<PaginatedResponse<MatchResult>>> => {
    return request<ApiResponse<PaginatedResponse<MatchResult>>>({
      method: 'GET',
      url: '/match-results',
    });
  },
  
  createMatchResult: async (resultData: Partial<MatchResult>): Promise<ApiResponse<MatchResult>> => {
    return request<ApiResponse<MatchResult>>({
      method: 'POST',
      url: '/match-results',
      data: resultData,
    });
  },
  
  // Sport-specific match results
  createFootballMatchResult: async (resultData: any): Promise<ApiResponse<MatchResult>> => {
    return request<ApiResponse<MatchResult>>({
      method: 'POST',
      url: '/match-results/football',
      data: resultData,
    });
  },
  
  createBasketballMatchResult: async (resultData: any): Promise<ApiResponse<MatchResult>> => {
    return request<ApiResponse<MatchResult>>({
      method: 'POST',
      url: '/match-results/basketball',
      data: resultData,
    });
  },
  
  createHandballMatchResult: async (resultData: any): Promise<ApiResponse<MatchResult>> => {
    return request<ApiResponse<MatchResult>>({
      method: 'POST',
      url: '/match-results/handball',
      data: resultData,
    });
  },
  
  createVolleyballMatchResult: async (resultData: any): Promise<ApiResponse<MatchResult>> => {
    return request<ApiResponse<MatchResult>>({
      method: 'POST',
      url: '/match-results/volleyball',
      data: resultData,
    });
  },
};