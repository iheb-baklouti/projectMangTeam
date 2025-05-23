import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Filter, ChevronDown } from 'lucide-react';
import Card from '../../components/ui/Card';
import { mockMatches, mockTeams } from '../../data/mockData';
import { Match } from '../../types';

const MatchesPage = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');

  // Filter matches based on filters
  const filteredMatches = mockMatches.filter(match => {
    const matchesType = selectedType === 'all' || match.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || match.status === selectedStatus;
    const matchesTeam = selectedTeam === 'all' || 
                       match.homeTeamId === selectedTeam || 
                       match.awayTeamId === selectedTeam;

    return matchesType && matchesStatus && matchesTeam;
  });

  // Sort matches by date (most recent first)
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Matches</h1>
          <p className="mt-1 text-sm text-neutral-500">
            View and manage all matches
          </p>
        </div>
      </div>

      <Card>
        <Card.Content className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Match Type Filter */}
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="official">Official</option>
                <option value="friendly">Friendly</option>
                <option value="training">Training</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-neutral-400" />
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-neutral-400" />
              </div>
            </div>

            {/* Team Filter */}
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                <option value="all">All Teams</option>
                {mockTeams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>

      <div className="space-y-4">
        {sortedMatches.map((match) => (
          <Link key={match.id} to={`/matches/${match.id}`}>
            <Card className="hover:border-primary-300 transition-colors">
              <Card.Content className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
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
                        <span className="ml-2 text-sm text-neutral-500">
                          {match.competition}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 text-lg font-medium text-neutral-900">
                      {match.type === 'training' 
                        ? 'Training Session'
                        : `${mockTeams.find(t => t.id === match.homeTeamId)?.name || 'Home Team'} vs ${
                            match.awayTeamId === '4' ? 'Dynamo FC' : 'Sporting Eagles'
                          }`}
                    </h3>

                    <div className="mt-2 flex items-center text-sm text-neutral-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(match.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {match.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {match.location}
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex flex-col items-end">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
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

                    {match.result && (
                      <div className="mt-2 text-xl font-semibold text-neutral-900">
                        {match.result.homeScore} - {match.result.awayScore}
                      </div>
                    )}
                  </div>
                </div>
              </Card.Content>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MatchesPage;