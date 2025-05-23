import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import TeamsPage from '../pages/teams/TeamsPage';
import TeamDetailsPage from '../pages/teams/TeamDetailsPage';
import PlayersPage from '../pages/players/PlayersPage';
import PlayerDetailsPage from '../pages/players/PlayerDetailsPage';
import MatchesPage from '../pages/matches/MatchesPage';
import MatchDetailsPage from '../pages/matches/MatchDetailsPage';
import TacticsPage from '../pages/tactics/TacticsPage';
import TacticDetailsPage from '../pages/tactics/TacticDetailsPage';
import StatisticsPage from '../pages/statistics/StatisticsPage';
import ProfilePage from '../pages/profile/ProfilePage';
import SettingsPage from '../pages/settings/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import { UserRole } from '../types';

const AppRoutes = () => {
  const { user, isLoading } = useUser();
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">
      <div className="animate-pulse-slow text-primary-600">Loading...</div>
    </div>;
  }
  
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Teams routes */}
        <Route path="/teams" element={
          <ProtectedRoute allowedRoles={['super_admin', 'club_admin', 'coach', 'analyst'] as UserRole[]}>
            <TeamsPage />
          </ProtectedRoute>
        } />
        <Route path="/teams/:teamId" element={<TeamDetailsPage />} />
        
        {/* Players routes */}
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/players/:playerId" element={<PlayerDetailsPage />} />
        
        {/* Matches routes */}
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/matches/:matchId" element={<MatchDetailsPage />} />
        
        {/* Tactics routes */}
        <Route path="/tactics" element={
          <ProtectedRoute allowedRoles={['coach', 'analyst'] as UserRole[]}>
           <TacticsPage />
          </ProtectedRoute>
        } />
        <Route path="/tactics/:tacticId" element={<TacticDetailsPage />} />
        
        {/* Statistics routes */}
        <Route path="/statistics" element={<StatisticsPage />} />
        
        {/* User routes */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      
      {/* Default routes */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;