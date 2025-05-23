// ✅ PlayerDetailsPage.tsx avec intégration API-Football, graphique saison et design moderne
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Award, Flag, Ruler, Weight, Users, ArrowLeft, Football } from 'lucide-react';
import Card from '../../components/ui/Card';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PlayerDetailsPage = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState<any | null>(null);
  const [stats, setStats] = useState<any | null>(null);
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState(2023);
  const [seasonStats, setSeasonStats] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [playerRes, statsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/players/${playerId}`),
          axios.get(`${import.meta.env.VITE_API_URL}/player-statistics/${playerId}`),
        ]);
        setPlayer(playerRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Failed to fetch player or statistics', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (playerId) loadData();
  }, [playerId]);

  useEffect(() => {
    const fetchRecentMatches = async () => {
      if (!player?.externalId) return;
      try {
        const res = await axios.get(`https://v3.football.api-sports.io/players?id=${player.externalId}&season=2023`, {
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_API_FOOTBALL_KEY,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        });
        const matches = res.data.response[0]?.statistics || [];
        setRecentMatches(matches);
      } catch (err) {
        console.error('Error fetching API-Football data:', err);
      }
    };
    fetchRecentMatches();
  }, [player]);

  useEffect(() => {
    const fetchSeasonStats = async () => {
      if (!player?.externalId) return;
      try {
        const res = await axios.get(`https://v3.football.api-sports.io/players?id=${player.externalId}&season=${season}`, {
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_API_FOOTBALL_KEY,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        });
        const matches = res.data.response[0]?.statistics || [];
        const formatted = matches.map((m: any) => ({
          team: m.team.name,
          goals: m.goals.total || 0,
          assists: m.goals.assists || 0,
          matches: m.games.appearances || 0,
        }));
        setSeasonStats(formatted);
      } catch (err) {
        console.error('Error fetching season stats:', err);
      }
    };
    fetchSeasonStats();
  }, [season, player]);

  if (isLoading) {
    return <div className="flex h-full items-center justify-center animate-pulse text-primary-600">Loading player details...</div>;
  }

  if (!player) {
    return <div className="text-center py-12"><h2 className="text-2xl font-semibold text-neutral-900">Player not found</h2></div>;
  }

  const age = new Date().getFullYear() - new Date(player.birthDate).getFullYear();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-2xl font-bold">
            {player.jerseyNumber}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{player.name || 'Unknown Player'}</h1>
            <p className="text-sm text-neutral-500">{player.position} • {player.teamName}</p>
          </div>
        </div>
        <Link to="/players" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><Card.Content className="p-4 flex items-center gap-3"><Calendar className="text-primary-600" /> Age: <strong>{age}</strong></Card.Content></Card>
        <Card><Card.Content className="p-4 flex items-center gap-3"><Flag className="text-secondary-600" /> Nationality: <strong>{player.nationality}</strong></Card.Content></Card>
        <Card><Card.Content className="p-4 flex items-center gap-3"><Ruler className="text-accent-600" /> Height: <strong>{player.height} cm</strong></Card.Content></Card>
        <Card><Card.Content className="p-4 flex items-center gap-3"><Weight className="text-success-600" /> Weight: <strong>{player.weight} kg</strong></Card.Content></Card>
      </div>

      <Card>
        <Card.Header><Card.Title>Performance Statistics</Card.Title></Card.Header>
        <Card.Content className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="font-medium text-neutral-600">Matches</p>
            <p>Appearances: <strong>{stats?.games?.appearances || 0}</strong></p>
            <p>Minutes: <strong>{stats?.games?.minutes || 0}</strong></p>
            <p>Rating: <strong>{stats?.games?.rating || '-'}</strong></p>
            <p>Goals: <strong>{stats?.goals?.total || 0}</strong></p>
            <p>Assists: <strong>{stats?.goals?.assists || 0}</strong></p>
            <p>Saves: <strong>{stats?.goals?.saves || 0}</strong></p>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-neutral-600">Discipline</p>
            <p>Yellow Cards: <strong>{stats?.cards?.yellow || 0}</strong></p>
            <p>Red Cards: <strong>{stats?.cards?.red || 0}</strong></p>
            <p>Fouls Committed: <strong>{stats?.fouls?.committed || 0}</strong></p>
            <p>Fouls Drawn: <strong>{stats?.fouls?.drawn || 0}</strong></p>
            <p>Penalty Scored: <strong>{stats?.penalty?.scored || 0}</strong></p>
            <p>Penalty Missed: <strong>{stats?.penalty?.missed || 0}</strong></p>
          </div>
        </Card.Content>
      </Card>

      {recentMatches.length > 0 && (
        <Card>
          <Card.Header><Card.Title>Live Match Stats (API-Football)</Card.Title></Card.Header>
          <Card.Content className="space-y-2">
            {recentMatches.map((match, i) => (
              <div key={i} className="border-b py-2 text-sm">
                <div className="font-semibold">vs {match.team?.name}</div>
                <div className="flex gap-4 text-neutral-600">
                  <span>Minutes: {match.games?.minutes || 0}</span>
                  <span>Rating: {match.games?.rating || '-'}</span>
                  <span>Goals: {match.goals?.total || 0}</span>
                  <span>Assists: {match.goals?.assists || 0}</span>
                </div>
              </div>
            ))}
          </Card.Content>
        </Card>
      )}

      <Card>
        <Card.Header>
          <Card.Title>Season Overview {season}</Card.Title>
          <select
            value={season}
            onChange={(e) => setSeason(parseInt(e.target.value))}
            className="ml-auto border border-neutral-300 rounded px-2 py-1 text-sm"
          >
            {[2023, 2022, 2021, 2020].map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </Card.Header>
        <Card.Content>
          {seasonStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={seasonStats}>
                <XAxis dataKey="team" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="goals" fill="#10b981" name="Goals" />
                <Bar dataKey="assists" fill="#3b82f6" name="Assists" />
                <Bar dataKey="matches" fill="#f59e0b" name="Matches" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-neutral-500">No season stats available for this player.</p>
          )}
        </Card.Content>
      </Card>

      <Card>
        <Card.Header><Card.Title>Contract Information</Card.Title></Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p>Joined: <strong>{new Date(player.joinedDate).toLocaleDateString()}</strong></p>
              <p>Contract Until: <strong>{player.contractEnd ? new Date(player.contractEnd).toLocaleDateString() : 'N/A'}</strong></p>
              <p>Market Value: <strong>€{(player.marketValue || 0).toLocaleString()}</strong></p>
            </div>
            <div>
              <p className="font-medium text-neutral-600 mb-2">Previous Clubs</p>
              {player.previousClubs?.length ? player.previousClubs.map((club, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{club.name}</span>
                  <span className="text-neutral-500">{new Date(club.from).getFullYear()} - {new Date(club.to).getFullYear()}</span>
                </div>
              )) : <p className="text-sm text-neutral-500">No previous clubs</p>}
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default PlayerDetailsPage;
