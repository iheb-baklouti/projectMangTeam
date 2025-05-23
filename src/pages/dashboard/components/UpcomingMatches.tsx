import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import { ChevronRight, Calendar, MapPin, Clock } from 'lucide-react';
import { Match } from '../../../types';

interface UpcomingMatchesProps {
  matches: Match[];
}

const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ matches }) => {
  // Sort matches by date (closest first)
  const sortedMatches = [...matches].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
  
  // Get only the next 3 matches
  const upcomingMatches = sortedMatches.slice(0, 3);
  
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <Card.Title>Upcoming Matches</Card.Title>
          <Link to="/matches" className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
            View all <ChevronRight size={16} />
          </Link>
        </div>
      </Card.Header>
      <Card.Content>
        {upcomingMatches.length > 0 ? (
          <div className="space-y-4">
            {upcomingMatches.map((match) => (
              <Link key={match.id} to={`/matches/${match.id}`}>
                <div className="rounded-lg border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all p-4">
                  <div className="flex justify-between mb-3">
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
                      <span className="text-xs text-neutral-500">{match.competition}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">
                        {match.type === 'training' 
                          ? `Team Training Session` 
                          : `FC United vs ${match.awayTeamId === '4' ? 'Dynamo FC' : 'Sporting Eagles'}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-neutral-500 grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(match.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {match.time}
                    </div>
                    <div className="flex items-center col-span-2">
                      <MapPin size={14} className="mr-1" />
                      {match.location}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-neutral-500">
            <Calendar className="h-12 w-12 mx-auto text-neutral-300 mb-3" />
            <p>No upcoming matches scheduled</p>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default UpcomingMatches;