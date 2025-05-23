import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Award, TrendingUp } from 'lucide-react';
import Card from '../../components/ui/Card';
import { mockMatches, mockTeams, getTeamStatisticsById } from '../../data/mockData';
import { Match } from '../../types';

const MatchDetailsPage = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (matchId) {
      // Simulate API call
      setTimeout(() => {
        const foundMatch = mockMatches.find(m => m.id === matchId);
        setMatch(foundMatch || null);
        setIsLoading(false);
      }, 500);
    }
  }, [matchId]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse text-primary-600">Loading match details...</div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Match not found</h2>
        <p className="mt-2 text-neutral-600">The match you're looking for doesn't exist.</p>
      </div>
    );
  }

  const homeTeam = mockTeams.find(t => t.id === match.homeTeamId);
  const homeTeamStats = getTeamStatisticsById(match.homeTeamId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              match.type === 'official' 
                ? 'bg-primary-100 text-primary-800'
                : match.type === 'friendly'
                ? 'bg-secondary-100 text-secondary-800'
                : 'bg-neutral-100 text-neutral-800'
            }`}>
              {match.type.charAt(0).toUpperCase() + match.type.slice(1)}
            </span>
            {match.competition && (
              <span className="ml-2 text-sm text-neutral-500">{match.competition}</span>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-bold text-neutral-900">
            {match.type === 'training' 
              ? 'Training Session'
              : `${homeTeam?.name || 'Home Team'} vs ${
                  match.awayTeamId === '4' ? 'Dynamo FC' : 'Sporting Eagles'
                }`}
          </h1>
        </div>

        <div className={`mt-4 md:mt-0 px-4 py-2 rounded-lg ${
          match.status === 'completed'
            ? 'bg-success-100 text-success-800'
            : match.status === 'scheduled'
            ? 'bg-primary-100 text-primary-800'
            : match.status === 'cancelled'
            ? 'bg-error-100 text-error-800'
            : 'bg-neutral-100 text-neutral-800'
        }`}>
          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
        </div>
      </div>

      {/* Match Info */}
      <Card>
        <Card.Content className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-neutral-400" />
              <div className="ml-3">
                <p className="text-sm text-neutral-500">Date</p>
                <p className="text-base font-medium text-neutral-900">
                  {new Date(match.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="h-5 w-5 text-neutral-400" />
              <div className="ml-3">
                <p className="text-sm text-neutral-500">Time</p>
                <p className="text-base font-medium text-neutral-900">{match.time}</p>
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-neutral-400" />
              <div className="ml-3">
                <p className="text-sm text-neutral-500">Location</p>
                <p className="text-base font-medium text-neutral-900">{match.location}</p>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Match Result */}
      {match.status === 'completed' && match.result && (
        <Card>
          <Card.Header>
            <Card.Title>Match Result</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="flex items-center justify-center py-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-neutral-900">{homeTeam?.name}</h3>
                <p className="text-4xl font-bold text-neutral-900 mt-2">{match.result.homeScore}</p>
              </div>
              <div className="mx-8 text-2xl font-bold text-neutral-400">vs</div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-neutral-900">
                  {match.awayTeamId === '4' ? 'Dynamo FC' : 'Sporting Eagles'}
                </h3>
                <p className="text-4xl font-bold text-neutral-900 mt-2">{match.result.awayScore}</p>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Match Statistics */}
      {match.status === 'completed' && homeTeamStats.length > 0 && (
        <Card>
          <Card.Header>
            <Card.Title>Match Statistics</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-neutral-900">{homeTeamStats[0].possession}%</div>
                <div className="text-sm text-neutral-500">Possession</div>
                <div className="text-sm font-medium text-neutral-900">
                  {100 - homeTeamStats[0].possession}%
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-neutral-900">{homeTeamStats[0].shots}</div>
                <div className="text-sm text-neutral-500">Shots</div>
                <div className="text-sm font-medium text-neutral-900">
                  {Math.floor(homeTeamStats[0].shots * 0.7)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-neutral-900">{homeTeamStats[0].shotsOnTarget}</div>
                <div className="text-sm text-neutral-500">Shots on Target</div>
                <div className="text-sm font-medium text-neutral-900">
                  {Math.floor(homeTeamStats[0].shotsOnTarget * 0.6)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-neutral-900">{homeTeamStats[0].corners}</div>
                <div className="text-sm text-neutral-500">Corners</div>
                <div className="text-sm font-medium text-neutral-900">
                  {Math.floor(homeTeamStats[0].corners * 0.8)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-neutral-900">{homeTeamStats[0].fouls}</div>
                <div className="text-sm text-neutral-500">Fouls</div>
                <div className="text-sm font-medium text-neutral-900">
                  {Math.floor(homeTeamStats[0].fouls * 1.2)}
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Match Notes */}
      {match.notes && (
        <Card>
          <Card.Header>
            <Card.Title>Notes</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-neutral-600">{match.notes}</p>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default MatchDetailsPage;