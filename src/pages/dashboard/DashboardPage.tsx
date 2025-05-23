import { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import Card from '../../components/ui/Card';
import {
  Users,
  Award,
  Calendar,
  TrendingUp,
  ChevronRight,
  AlertTriangle,
  Activity,
  Clock,
  BarChart2
} from 'lucide-react';
import { 
  mockTeams, 
  mockPlayers, 
  mockMatches, 
  getTeamStatisticsById 
} from '../../data/mockData';
import { Link } from 'react-router-dom';

// Import sub-components
import UpcomingMatches from './components/UpcomingMatches';
import TeamPerformance from './components/TeamPerformance';
import PlayerCards from './components/PlayerCards';

const DashboardPage = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse text-primary-600">Loading dashboard...</div>
      </div>
    );
  }
  
  // Role-specific greeting and stats
  const renderRoleSpecificContent = () => {
    switch (user?.role) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'club_admin':
        return <ClubAdminDashboard />;
      case 'coach':
        return <CoachDashboard />;
      case 'analyst':
        return <AnalystDashboard />;
      case 'player':
        return <PlayerDashboard />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Welcome back, {user?.name}! Here's what's happening.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="text-sm font-medium text-primary-600 hover:text-primary-700 px-3 py-1 rounded-md bg-primary-50 hover:bg-primary-100 transition-colors">
            Export Report
          </button>
        </div>
      </div>
      
      {renderRoleSpecificContent()}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingMatches matches={mockMatches.filter(match => match.status === 'scheduled')} />
        <TeamPerformance />
      </div>
    </div>
  );
};

// Role-specific dashboard components
const SuperAdminDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Clubs"
          value="7"
          change="+1"
          status="up"
          icon={<Award className="h-6 w-6 text-primary-600" />}
        />
        <StatsCard
          title="Active Teams"
          value="23"
          change="+3"
          status="up"
          icon={<Users className="h-6 w-6 text-secondary-600" />}
        />
        <StatsCard
          title="Total Players"
          value="483"
          change="+15"
          status="up"
          icon={<Users className="h-6 w-6 text-accent-600" />}
        />
        <StatsCard
          title="Upcoming Matches"
          value="17"
          change=""
          status="neutral"
          icon={<Calendar className="h-6 w-6 text-warning-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <div className="flex justify-between items-center">
              <Card.Title>Club Admins</Card.Title>
              <Link to="/admins" className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
                View all <ChevronRight size={16} />
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center p-2 hover:bg-neutral-50 rounded-md">
                  <div className="w-10 h-10 rounded-full bg-neutral-200 flex-shrink-0"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-900">Admin Name {i}</p>
                    <p className="text-xs text-neutral-500">Club {i}</p>
                  </div>
                  <div className="ml-auto text-xs text-neutral-500">
                    Last active: {i} hour{i > 1 ? 's' : ''} ago
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Header>
            <div className="flex justify-between items-center">
              <Card.Title>System Alerts</Card.Title>
              <Link to="/alerts" className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
                View all <ChevronRight size={16} />
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              <div className="rounded-md bg-error-50 p-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-error-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-error-800">Database Backup Required</h3>
                    <div className="mt-1 text-xs text-error-700">
                      <p>Last backup was 7 days ago. Please run a new backup.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-warning-50 p-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-warning-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-warning-800">Storage Usage High</h3>
                    <div className="mt-1 text-xs text-warning-700">
                      <p>Storage is at 85% capacity. Consider cleaning old data.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </>
  );
};

const ClubAdminDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Teams"
          value={mockTeams.length.toString()}
          change=""
          status="neutral"
          icon={<Award className="h-6 w-6 text-primary-600" />}
        />
        <StatsCard
          title="Total Players"
          value={mockPlayers.length.toString()}
          change="+2"
          status="up"
          icon={<Users className="h-6 w-6 text-secondary-600" />}
        />
        <StatsCard
          title="Upcoming Matches"
          value={mockMatches.filter(m => m.status === 'scheduled').length.toString()}
          change=""
          status="neutral"
          icon={<Calendar className="h-6 w-6 text-accent-600" />}
        />
        <StatsCard
          title="Recent Results"
          value={mockMatches.filter(m => m.status === 'completed').length.toString()}
          change=""
          status="neutral"
          icon={<Activity className="h-6 w-6 text-warning-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PlayerCards />
        
        <Card>
          <Card.Header>
            <div className="flex justify-between items-center">
              <Card.Title>Team Overview</Card.Title>
              <Link to="/teams" className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
                View all <ChevronRight size={16} />
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              {mockTeams.map((team) => (
                <Link key={team.id} to={`/teams/${team.id}`}>
                  <div className="flex items-center p-2 hover:bg-neutral-50 rounded-md">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {team.logo ? (
                        <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
                      ) : (
                        <Award className="h-5 w-5 text-neutral-400" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-neutral-900">{team.name}</p>
                      <p className="text-xs text-neutral-500">{team.category} • {team.gender}</p>
                    </div>
                    <div className="ml-auto flex items-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                        {mockPlayers.filter(p => p.teamId === team.id).length} Players
                      </span>
                      <ChevronRight size={16} className="ml-2 text-neutral-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>
    </>
  );
};

const CoachDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Team Players"
          value="23"
          change="+1"
          status="up"
          icon={<Users className="h-6 w-6 text-primary-600" />}
        />
        <StatsCard
          title="Next Match"
          value="2 days"
          change=""
          status="neutral"
          icon={<Clock className="h-6 w-6 text-secondary-600" />}
        />
        <StatsCard
          title="Win Ratio"
          value="68%"
          change="+3%"
          status="up"
          icon={<TrendingUp className="h-6 w-6 text-accent-600" />}
        />
        <StatsCard
          title="Training Sessions"
          value="3"
          change="This Week"
          status="neutral"
          icon={<Calendar className="h-6 w-6 text-warning-500" />}
        />
      </div>
      
      <Card className="mt-6">
        <Card.Header>
          <div className="flex justify-between items-center">
            <Card.Title>Team Health Status</Card.Title>
            <Link to="/team-health" className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
              View details <ChevronRight size={16} />
            </Link>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-neutral-700">Fully Fit</div>
              <div className="text-sm font-medium text-success-600">19 Players</div>
              <div className="w-1/2 bg-neutral-200 rounded-full h-2.5">
                <div className="bg-success-500 h-2.5 rounded-full" style={{ width: '83%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-neutral-700">Minor Issues</div>
              <div className="text-sm font-medium text-warning-600">3 Players</div>
              <div className="w-1/2 bg-neutral-200 rounded-full h-2.5">
                <div className="bg-warning-500 h-2.5 rounded-full" style={{ width: '13%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-neutral-700">Injured</div>
              <div className="text-sm font-medium text-error-600">1 Player</div>
              <div className="w-1/2 bg-neutral-200 rounded-full h-2.5">
                <div className="bg-error-500 h-2.5 rounded-full" style={{ width: '4%' }}></div>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </>
  );
};

const AnalystDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Team Performance"
          value="76%"
          change="+2%"
          status="up"
          icon={<TrendingUp className="h-6 w-6 text-primary-600" />}
        />
        <StatsCard
          title="Analyzed Matches"
          value="32"
          change="+5"
          status="up"
          icon={<BarChart2 className="h-6 w-6 text-secondary-600" />}
        />
        <StatsCard
          title="Player Reports"
          value="47"
          change="+12"
          status="up"
          icon={<Users className="h-6 w-6 text-accent-600" />}
        />
        <StatsCard
          title="Pending Analysis"
          value="3"
          change=""
          status="neutral"
          icon={<Clock className="h-6 w-6 text-warning-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <Card.Header>
            <Card.Title>Team Performance Metrics</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {getTeamStatisticsById('1').length > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-neutral-700">Possession</div>
                    <div className="w-3/5 bg-neutral-200 rounded-full h-2.5">
                      <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${getTeamStatisticsById('1')[0].possession}%` }}></div>
                    </div>
                    <div className="text-sm font-medium text-neutral-900">{getTeamStatisticsById('1')[0].possession}%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-neutral-700">Shot Accuracy</div>
                    <div className="w-3/5 bg-neutral-200 rounded-full h-2.5">
                      <div className="bg-secondary-500 h-2.5 rounded-full" style={{ width: `${(getTeamStatisticsById('1')[0].shotsOnTarget / getTeamStatisticsById('1')[0].shots) * 100}%` }}></div>
                    </div>
                    <div className="text-sm font-medium text-neutral-900">
                      {((getTeamStatisticsById('1')[0].shotsOnTarget / getTeamStatisticsById('1')[0].shots) * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-neutral-700">Goals per Match</div>
                    <div className="w-3/5 bg-neutral-200 rounded-full h-2.5">
                      <div className="bg-accent-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-sm font-medium text-neutral-900">{getTeamStatisticsById('1')[0].goals}</div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-neutral-500">No team statistics available</div>
              )}
            </div>
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Header>
            <div className="flex justify-between items-center">
              <Card.Title>Recent Analysis Tasks</Card.Title>
              <Link to="/analysis" className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
                View all <ChevronRight size={16} />
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              <div className="p-3 rounded-md border border-neutral-200 hover:bg-neutral-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Match Analysis: FC United vs Sporting Eagles</h4>
                    <p className="text-xs text-neutral-500 mt-1">Completed 2 days ago</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                    Completed
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-md border border-neutral-200 hover:bg-neutral-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Player Performance Report - Leo Player</h4>
                    <p className="text-xs text-neutral-500 mt-1">In Progress</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    In Progress
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-md border border-neutral-200 hover:bg-neutral-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Team Formation Analysis</h4>
                    <p className="text-xs text-neutral-500 mt-1">Due in 2 days</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
                    Pending
                  </span>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </>
  );
};

const PlayerDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Matches Played"
          value="16"
          change="+1"
          status="up"
          icon={<Calendar className="h-6 w-6 text-primary-600" />}
        />
        <StatsCard
          title="Goals"
          value="7"
          change="+2"
          status="up"
          icon={<Award className="h-6 w-6 text-secondary-600" />}
        />
        <StatsCard
          title="Assists"
          value="5"
          change="+1"
          status="up"
          icon={<Users className="h-6 w-6 text-accent-600" />}
        />
        <StatsCard
          title="Avg. Rating"
          value="7.8"
          change="+0.3"
          status="up"
          icon={<BarChart2 className="h-6 w-6 text-warning-500" />}
        />
      </div>
      
      <div className="mt-6">
        <Card>
          <Card.Header>
            <Card.Title>Your Performance Stats</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-3">Offensive Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-700">Goals per Game</div>
                    <div className="w-3/5 bg-neutral-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <div className="text-sm font-medium text-neutral-900">0.45</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-700">Shot Accuracy</div>
                    <div className="w-3/5 bg-neutral-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                    <div className="text-sm font-medium text-neutral-900">62%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-700">Pass Completion</div>
                    <div className="w-3/5 bg-neutral-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <div className="text-sm font-medium text-neutral-900">78%</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-3">Defensive Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-700">Tackles per Game</div>
                    <div className="w-3/5 bg-neutral-200 rounded-full h-2">
                      <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                    <div className="text-sm font-medium text-neutral-900">1.3</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-700">Interceptions</div>
                    <div className="w-3/5 bg-neutral-200 rounded-full h-2">
                      <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <div className="text-sm font-medium text-neutral-900">1.8</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-700">Duels Won</div>
                    <div className="w-3/5 bg-neutral-200 rounded-full h-2">
                      <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                    <div className="text-sm font-medium text-neutral-900">55%</div>
                  </div>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </>
  );
};

// Common StatsCard component
const StatsCard = ({ title, value, change, status, icon }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'up':
        return 'text-success-500';
      case 'down':
        return 'text-error-500';
      default:
        return 'text-neutral-500';
    }
  };
  
  return (
    <Card>
      <Card.Content className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500">{title}</p>
            <p className="mt-1 text-2xl font-semibold text-neutral-900">{value}</p>
            {change && (
              <p className={`mt-1 text-xs font-medium ${getStatusColor()}`}>
                {change}
              </p>
            )}
          </div>
          <div className="rounded-full p-3 bg-neutral-100">{icon}</div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default DashboardPage;