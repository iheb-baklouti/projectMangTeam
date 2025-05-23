import React from 'react';
import Card from '../../../components/ui/Card';
import { mockTeamStatistics } from '../../../data/mockData';

const TeamPerformance: React.FC = () => {
  // For a real app, you would dynamically fetch/calculate these values from actual data
  const teamStats = mockTeamStatistics[0] || {
    possession: 65,
    shots: 15,
    shotsOnTarget: 8,
    goals: 3,
    goalsConceded: 1,
    corners: 7,
    fouls: 10
  };
  
  // Calculate some derived metrics
  const shotAccuracy = teamStats.shots > 0 
    ? Math.round((teamStats.shotsOnTarget / teamStats.shots) * 100) 
    : 0;
  
  const conversionRate = teamStats.shotsOnTarget > 0 
    ? Math.round((teamStats.goals / teamStats.shotsOnTarget) * 100) 
    : 0;
  
  const defensiveRating = 10 - (teamStats.goalsConceded * 2);
  
  // Performance metrics to display
  const performanceMetrics = [
    { 
      name: 'Possession', 
      value: `${teamStats.possession}%`, 
      percentage: teamStats.possession,
      color: 'bg-primary-500' 
    },
    { 
      name: 'Shot Accuracy', 
      value: `${shotAccuracy}%`, 
      percentage: shotAccuracy,
      color: 'bg-secondary-500' 
    },
    { 
      name: 'Conversion Rate', 
      value: `${conversionRate}%`, 
      percentage: conversionRate,
      color: 'bg-accent-500' 
    },
    { 
      name: 'Defensive Rating', 
      value: `${defensiveRating}/10`, 
      percentage: defensiveRating * 10,
      color: 'bg-success-500' 
    },
  ];
  
  return (
    <Card>
      <Card.Header>
        <Card.Title>Team Performance</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="space-y-6">
          {performanceMetrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-neutral-700">{metric.name}</span>
                <span className="text-sm font-semibold text-neutral-900">{metric.value}</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2.5">
                <div 
                  className={`${metric.color} h-2.5 rounded-full`} 
                  style={{ width: `${metric.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="text-xl font-semibold text-primary-600">{teamStats.goals}</div>
            <div className="text-xs text-neutral-500">Goals Scored</div>
          </div>
          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="text-xl font-semibold text-error-600">{teamStats.goalsConceded}</div>
            <div className="text-xs text-neutral-500">Goals Conceded</div>
          </div>
          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="text-xl font-semibold text-secondary-600">{teamStats.shots}</div>
            <div className="text-xs text-neutral-500">Total Shots</div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default TeamPerformance;