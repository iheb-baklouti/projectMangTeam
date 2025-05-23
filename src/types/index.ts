// User Types
export type UserRole = 'SUPER_ADMIN' | 'CLUB_ADMIN' | 'COACH' | 'PERFORMANCE_ANALYST' | 'PLAYER';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string[]; // ["super_admin"]
  association?: string;
  createdAt: string;
  updatedAt: string;
}

// Team Types
export interface Team {
  _id: string;
  name: string;
  logo?: string;
  leagueId: string;
  country?: string;
  city?: string;
  division?: string;
  venue?: string;
  founded?: string;
  type: 'CLUB' | 'NATIONAL' | 'OTHER'; // adapter à l'enum exact
  sport_type: 'FOOTBALL' | 'BASKETBALL' | 'HANDBALL' | 'VOLLEYBALL';
  players?: string[];
  apiId?: number;
  national?: boolean;
  createdAt: string;
  updatedAt: string;
  associationId? : any;
}



// Player Types
export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  position: string;
  jerseyNumber: number;
  height?: number;
  weight?: number;
  profileImage?: string;
  teamId?: string;
  createdAt: string;
  updatedAt: string;
}

// Match Types
export type MatchStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'CANCELLED';
export type MatchType = 'OFFICIAL' | 'FRIENDLY' | 'TRAINING';

export interface Match {
  _id: string;
  name?: string;
  homeTeamId: Team;
  awayTeamId: Team;
  homeScore?: number;
  awayScore?: number;
  venue?: string | Venue;
  date?: any;
  time?: string | { elapsed?: number; extra?: number };
  type?: string;
  status?: string;
  sport_type: string;
  attendance?: any;
  statistics?: {
    goals?: {
      home: number;
      away: number;
      _id?: string;
    };
    score?: {
      halftime?: { home: number; away: number; _id?: string };
      fulltime?: { home: number; away: number; _id?: string };
      extratime?: { home: number; away: number; _id?: string };
      penalty?: { home: number; away: number; _id?: string };
    };
    shots?: {
      on_goal: number;
      off_goal: number;
      total: number;
      blocked: number;
      inside_box: number;
      outside_box: number;
    };
    passes?: {
      total: number;
      accurate: number;
      percentage: string;
    };
    fouls?: number;
    offsides?: number;
    goalkeeper_saves?: number;
    ball_possession?: string;
    corner_kicks?: number;
    cards?: {
      yellow: number;
      red: number;
    };
  };

  createdAt?: string;
  updatedAt?: string;
}

export interface Venue {
  _id: string;
  name: string;
  address: string;
  city: string | any;
  capacity: number;
  image?: string;
  surface: string;
  associationId: string;
  sport_type: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  isDeleted?: boolean;
  __v?: number;
  [key: string]: any; // facultatif pour tolérer d'autres champs
}



// Match Results Types
export interface MatchResult {
  id: string;
  matchId: string;
  match?: Match;
  homeScore: number;
  awayScore: number;
  sportSpecificData: any; // This will vary based on the sport
  createdAt: string;
  updatedAt: string;
}

// Player Statistics Types
export interface PlayerStatistics {
  id: string;
  playerId: string;
  player?: Player;
  matchId: string;
  match?: Match;
  minutesPlayed: number;
  sportSpecificStats: any; // This will vary based on the sport
  createdAt: string;
  updatedAt: string;
}

// Team Statistics Types
export interface TeamStatistics {
  id: string;
  teamId: string;
  team?: Team;
  matchId: string;
  match?: Match;
  sportSpecificStats: any; // This will vary based on the sport
  createdAt: string;
  updatedAt: string;
}

// Tactical Strategy Types
export interface TacticalStrategy {
  id: string;
  name: string;
  description: string;
  formation: string;
  teamId: string;
  team?: Team;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface TeamsResponse {
  teams: Team[];
  total: number;
}

export interface MatchesResponse {
  matches: Match[];
  total: number;
}