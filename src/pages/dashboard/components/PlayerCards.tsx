import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import { ChevronRight, Award } from 'lucide-react';
import { mockPlayers } from '../../../data/mockData';

const PlayerCards: React.FC = () => {
  // Get top 4 players (in a real app, you would sort by some performance metric)
  const topPlayers = mockPlayers.slice(0, 4);
  
  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <Card.Title>Top Players</Card.Title>
          <Link to="/players" className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
            View all <ChevronRight size={16} />
          </Link>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="grid grid-cols-2 gap-3">
          {topPlayers.map((player) => (
            <Link key={player.id} to={`/players/${player.id}`}>
              <div className="border border-neutral-200 rounded-lg overflow-hidden hover:border-primary-300 hover:shadow-sm transition-all">
                <div className="p-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
                      <span className="font-semibold">{player.jerseyNumber}</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-neutral-900">
                        {player.userId === '5' ? 'Leo Player' : 
                         player.userId === '6' ? 'Carlos Keeper' : 
                         player.userId === '7' ? 'Marcel Defender' : 
                         'Bruno Midfielder'}
                      </p>
                      <p className="text-xs text-neutral-500">{player.position}</p>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      <Award size={12} className="text-primary-500" />
                      <span>{player.id === '1' ? '7 Goals' : player.id === '2' ? '5 Clean Sheets' : player.id === '3' ? '12 Tackles' : '5 Assists'}</span>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                        {player.id === '1' ? '8.5' : player.id === '2' ? '7.8' : player.id === '3' ? '7.4' : '8.1'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

export default PlayerCards;