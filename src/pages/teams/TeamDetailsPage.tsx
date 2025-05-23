import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users, Calendar, Award, TrendingUp } from 'lucide-react';
import Card from '../../components/ui/Card';
import { Team, Player, Match } from '../../types';
import { teamsService } from '../../services/teams';
import { matchesService } from '../../services/matches';


const TeamDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const associationId = searchParams.get('associationId');

  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !associationId) return;

      try {
        setIsLoading(true);
        const teamRes = await teamsService.getTeamById(id, associationId);
        const teamData = teamRes.data?.team;
        setTeam(teamData || null);

        const [playersRes, matchesRes] = await Promise.all([
          playersService.getPlayersByTeamId(id),
          matchesService.getMatchesByTeamId(id),
        ]);

        setPlayers(playersRes.data || []);
        setMatches(matchesRes.data || []);
      } catch (error) {
        console.error('Erreur chargement des données équipe :', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, associationId]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse text-primary-600">Chargement des détails de l'équipe...</div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Équipe introuvable</h2>
        <p className="mt-2 text-neutral-600">L'équipe que vous recherchez n'existe pas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête équipe */}
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center">
          {team.logo ? (
            <img src={team.logo} alt={team.name} className="h-12 w-12 object-contain" />
          ) : (
            <Award className="h-8 w-8 text-neutral-400" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">{team.name}</h1>
          <p className="text-sm text-neutral-500">
            {team.country} • {team.division || team.type} • Fondée {team.founded || 'N/A'}
          </p>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-2 bg-primary-50">
                <Users className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-500">Effectif</p>
                <p className="text-xl font-semibold text-neutral-900">{players.length}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-2 bg-secondary-50">
                <Calendar className="h-5 w-5 text-secondary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-500">Type</p>
                <p className="text-xl font-semibold text-neutral-900">{team.sport_type}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-2 bg-accent-50">
                <Award className="h-5 w-5 text-accent-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-500">Matchs</p>
                <p className="text-xl font-semibold text-neutral-900">{matches.length}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-2 bg-success-50">
                <TrendingUp className="h-5 w-5 text-success-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-500">Taux de Victoires</p>
                <p className="text-xl font-semibold text-neutral-900">
                  {matches.length > 0
                    ? `${Math.round(
                        (matches.filter((m) => m.result?.homeScore > m.result?.awayScore).length /
                          matches.length) *
                          100
                      )}%`
                    : 'N/A'}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Liste des joueurs */}
      <Card>
        <Card.Header>
          <Card.Title>Effectif</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Poste</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Numéro</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Nationalité</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Âge</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {players.map((player) => (
                  <tr key={player._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{player.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{player.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{player.jerseyNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{player.nationality}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {player.birthDate ? new Date().getFullYear() - new Date(player.birthDate).getFullYear() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>

      {/* Matchs récents */}
      <Card>
        <Card.Header>
          <Card.Title>Matchs récents</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {matches.slice(0, 5).map((match) => (
              <div key={match._id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <span className="text-sm font-medium text-neutral-900">
                    {match.homeTeamId?.name} vs {match.awayTeamId?.name}
                  </span>
                  <div className="text-xs text-neutral-500 mt-1">
                    {new Date(match.date).toLocaleDateString()} • {match.location}
                  </div>
                </div>
                {match.result && (
                  <div className="text-sm font-semibold">
                    {match.result.homeScore} - {match.result.awayScore}
                  </div>
                )}
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  match.status === 'completed'
                    ? 'bg-success-100 text-success-800'
                    : match.status === 'scheduled'
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-neutral-100 text-neutral-800'
                }`}>
                  {match.status}
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default TeamDetailsPage;
