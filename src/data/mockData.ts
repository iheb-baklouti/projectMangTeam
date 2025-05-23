import { Club, Match, Player, Team, TacticalStrategy, User, PlayerStatistics, TeamStatistics, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@example.com',
    role: 'super_admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastLogin: '2023-10-15T08:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'manager@example.com',
    role: 'club_admin',
    clubId: '1',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastLogin: '2023-10-14T14:20:00Z'
  },
  {
    id: '3',
    name: 'Mike Coach',
    email: 'coach@example.com',
    role: 'coach',
    clubId: '1',
    teamId: '1',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastLogin: '2023-10-15T10:15:00Z'
  },
  {
    id: '4',
    name: 'Alex Analyst',
    email: 'analyst@example.com',
    role: 'analyst',
    clubId: '1',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastLogin: '2023-10-13T16:45:00Z'
  },
  {
    id: '5',
    name: 'Leo Player',
    email: 'player@example.com',
    role: 'player',
    clubId: '1',
    teamId: '1',
    position: 'Forward',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastLogin: '2023-10-12T19:30:00Z'
  }
];

// Mock Clubs
export const mockClubs: Club[] = [
  {
    id: '1',
    name: 'FC United',
    logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    foundedYear: 1985,
    location: 'Manchester, UK',
    description: 'A premier football club with rich history and tradition.',
    website: 'www.fcunited.com',
    colors: ['#FF0000', '#FFFFFF', '#000000']
  },
  {
    id: '2',
    name: 'Sporting Eagles',
    logo: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    foundedYear: 1990,
    location: 'London, UK',
    description: 'Rising stars in the league with a focus on youth development.',
    website: 'www.sportingeagles.com',
    colors: ['#0000FF', '#FFFFFF']
  }
];

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'FC United First Team',
    clubId: '1',
    logo: 'https://images.pexels.com/photos/47343/the-ball-stadion-football-the-pitch-47343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Senior',
    gender: 'male',
    coach: '3', // Mike Coach
    season: '2023-2024',
    founded: 1985
  },
  {
    id: '2',
    name: 'FC United U21',
    clubId: '1',
    logo: 'https://images.pexels.com/photos/47343/the-ball-stadion-football-the-pitch-47343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'U21',
    gender: 'male',
    season: '2023-2024',
    founded: 1995
  },
  {
    id: '3',
    name: 'FC United Women',
    clubId: '1',
    logo: 'https://images.pexels.com/photos/47343/the-ball-stadion-football-the-pitch-47343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Senior',
    gender: 'female',
    season: '2023-2024',
    founded: 2005
  }
];

// Mock Players
export const mockPlayers: Player[] = [
  {
    id: '1',
    userId: '5', // Leo Player
    teamId: '1',
    jerseyNumber: 10,
    position: 'Forward',
    height: 175,
    weight: 70,
    birthDate: '1998-05-15',
    nationality: 'England',
    strongFoot: 'right',
    joinedDate: '2020-01-15',
    contractEnd: '2025-06-30',
    marketValue: 5000000,
    previousClubs: [
      { name: 'Youth Academy FC', from: '2010-01-01', to: '2019-12-31' }
    ]
  },
  {
    id: '2',
    userId: '6',
    teamId: '1',
    jerseyNumber: 1,
    position: 'Goalkeeper',
    height: 190,
    weight: 85,
    birthDate: '1995-08-20',
    nationality: 'Spain',
    strongFoot: 'right',
    joinedDate: '2019-07-01',
    contractEnd: '2024-06-30',
    marketValue: 2000000
  },
  {
    id: '3',
    userId: '7',
    teamId: '1',
    jerseyNumber: 5,
    position: 'Defender',
    height: 185,
    weight: 80,
    birthDate: '1997-03-12',
    nationality: 'France',
    strongFoot: 'left',
    joinedDate: '2021-01-10',
    contractEnd: '2025-06-30',
    marketValue: 3500000
  },
  {
    id: '4',
    userId: '8',
    teamId: '1',
    jerseyNumber: 8,
    position: 'Midfielder',
    height: 178,
    weight: 72,
    birthDate: '1999-11-05',
    nationality: 'Brazil',
    strongFoot: 'right',
    joinedDate: '2022-07-15',
    contractEnd: '2026-06-30',
    marketValue: 4500000
  }
];

// Mock Matches
export const mockMatches: Match[] = [
  {
    id: '1',
    type: 'official',
    homeTeamId: '1',
    awayTeamId: '4', // Some other team not in our mock data
    date: '2023-10-20',
    time: '15:00',
    location: 'United Stadium',
    status: 'scheduled',
    season: '2023-2024',
    competition: 'Premier League',
    tacticalStrategyId: '1'
  },
  {
    id: '2',
    type: 'friendly',
    homeTeamId: '1',
    awayTeamId: '5', // Some other team not in our mock data
    date: '2023-10-15',
    time: '14:30',
    location: 'Training Ground',
    status: 'completed',
    result: {
      homeScore: 3,
      awayScore: 1
    },
    season: '2023-2024'
  },
  {
    id: '3',
    type: 'training',
    homeTeamId: '1',
    date: '2023-10-18',
    time: '10:00',
    location: 'Training Ground',
    status: 'completed',
    notes: 'Focus on defensive positioning and counter-attacks'
  }
];

// Mock Tactical Strategies
export const mockTacticalStrategies: TacticalStrategy[] = [
  {
    id: '1',
    name: 'High Press 4-3-3',
    createdBy: '3', // Mike Coach
    teamId: '1',
    formation: '4-3-3',
    description: 'High pressing system focusing on quick ball recovery and direct counter-attacks.',
    playerPositions: [
      { playerId: '2', position: 'GK', role: 'Goalkeeper' },
      { playerId: '3', position: 'CB', role: 'Center Back' },
      { playerId: '4', position: 'CM', role: 'Central Midfielder' },
      { playerId: '1', position: 'CF', role: 'Center Forward' }
    ],
    created: '2023-09-01T10:00:00Z',
    lastUpdated: '2023-10-10T14:30:00Z'
  },
  {
    id: '2',
    name: 'Defensive 5-4-1',
    createdBy: '3', // Mike Coach
    teamId: '1',
    formation: '5-4-1',
    description: 'Defensive setup for tough away games. Compact shape with counter-attacking potential.',
    created: '2023-09-15T11:20:00Z',
    lastUpdated: '2023-09-15T11:20:00Z'
  }
];

// Mock Player Statistics
export const mockPlayerStatistics: PlayerStatistics[] = [
  {
    playerId: '1', // Leo Player
    matchId: '2', // The completed friendly match
    minutesPlayed: 90,
    goals: 2,
    assists: 1,
    shots: 5,
    shotsOnTarget: 3,
    passes: 45,
    passAccuracy: 85,
    tackles: 2,
    interceptions: 1,
    fouls: 2,
    yellowCards: 0,
    redCards: 0,
    rating: 8.5
  },
  {
    playerId: '3', // Defender
    matchId: '2', // The completed friendly match
    minutesPlayed: 90,
    goals: 0,
    assists: 0,
    shots: 1,
    shotsOnTarget: 0,
    passes: 65,
    passAccuracy: 90,
    tackles: 8,
    interceptions: 6,
    fouls: 1,
    yellowCards: 0,
    redCards: 0,
    rating: 7.8
  }
];

// Mock Team Statistics
export const mockTeamStatistics: TeamStatistics[] = [
  {
    teamId: '1', // FC United First Team
    matchId: '2', // The completed friendly match
    possession: 65,
    shots: 15,
    shotsOnTarget: 8,
    corners: 7,
    freeKicks: 5,
    fouls: 10,
    yellowCards: 1,
    redCards: 0,
    offsides: 2,
    goals: 3,
    goalsConceded: 1
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '5', // Leo Player
    title: 'Match Reminder',
    message: 'Upcoming match against Sporting Eagles on Saturday. Be at the stadium 2 hours before kickoff.',
    type: 'info',
    read: false,
    createdAt: '2023-10-16T10:30:00Z',
    link: '/matches/1'
  },
  {
    id: '2',
    userId: '5', // Leo Player
    title: 'Performance Report',
    message: 'Your performance report for the last match is now available.',
    type: 'success',
    read: true,
    createdAt: '2023-10-14T15:45:00Z',
    link: '/player/stats'
  },
  {
    id: '3',
    userId: '3', // Mike Coach
    title: 'Strategy Approval',
    message: 'Your tactical strategy "High Press 4-3-3" has been approved.',
    type: 'success',
    read: false,
    createdAt: '2023-10-15T09:20:00Z',
    link: '/tactics/1'
  }
];

// Helper function to get statistics for a specific player
export const getPlayerStatisticsById = (playerId: string): PlayerStatistics[] => {
  return mockPlayerStatistics.filter(stat => stat.playerId === playerId);
};

// Helper function to get statistics for a specific team
export const getTeamStatisticsById = (teamId: string): TeamStatistics[] => {
  return mockTeamStatistics.filter(stat => stat.teamId === teamId);
};

// Helper function to get matches for a specific team
export const getMatchesByTeamId = (teamId: string): Match[] => {
  return mockMatches.filter(match => 
    match.homeTeamId === teamId || match.awayTeamId === teamId
  );
};

// Helper function to get players for a specific team
export const getPlayersByTeamId = (teamId: string): Player[] => {
  return mockPlayers.filter(player => player.teamId === teamId);
};

// Helper function to get notifications for a user
export const getNotificationsByUserId = (userId: string): Notification[] => {
  return mockNotifications.filter(notification => notification.userId === userId);
};