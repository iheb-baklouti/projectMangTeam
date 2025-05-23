// TacticDetailsPage.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Calendar, TrendingUp, Aperture } from 'lucide-react';
import Card from '../../components/ui/Card';
import { mockTacticalStrategies, mockTeams, mockPlayers } from '../../data/mockData';
import { TacticalStrategy } from '../../types';
import Pitch from '../../components/Pitch/Pitch';


const TacticDetailsPage = () => {
  const { tacticId } = useParams();
  const [tactic, setTactic] = useState<TacticalStrategy | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tacticId) {
      setTimeout(() => {
        const foundTactic = mockTacticalStrategies.find(t => t.id === tacticId);
        setTactic(foundTactic || null);
        setIsLoading(false);
      }, 500);
    }
  }, [tacticId]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse text-primary-600">Loading tactic details...</div>
      </div>
    );
  }

  if (!tactic) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Tactic not found</h2>
        <p className="mt-2 text-neutral-600">The tactical strategy you're looking for doesn't exist.</p>
      </div>
    );
  }

  const team = mockTeams.find(t => t.id === tactic.teamId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
            <Aperture className="h-10 w-10 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{tactic.name}</h1>
            <p className="text-sm text-neutral-500">
              {team?.name} • {tactic.formation}
            </p>
          </div>
        </div>

        <div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
            Edit Strategy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-2 bg-primary-50">
                <Users className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-500">Players</p>
                <p className="text-xl font-semibold text-neutral-900">
                  {tactic.playerPositions?.length || 0}
                </p>
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
                <p className="text-sm font-medium text-neutral-500">Created</p>
                <p className="text-xl font-semibold text-neutral-900">
                  {new Date(tactic.created).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-2 bg-accent-50">
                <TrendingUp className="h-5 w-5 text-accent-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-500">Last Updated</p>
                <p className="text-xl font-semibold text-neutral-900">
                  {new Date(tactic.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <Card.Title>Description</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-neutral-600">{tactic.description}</p>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Formation: {tactic.formation}</Card.Title>
        </Card.Header>
        <Card.Content>
          <Pitch formation={tactic.formation} playerPositions={tactic.playerPositions || []} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default TacticDetailsPage;