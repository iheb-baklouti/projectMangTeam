import React from 'react';
import { BarChart2, TrendingUp, Award, Users } from 'lucide-react';
import Card from '../../components/ui/Card';
import { mockTeams, mockPlayers, mockTeamStatistics, mockPlayerStatistics } from '../../data/mockData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsPage = () => {
  // Team Performance Data
  const teamPerformanceData = {
    labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
    datasets: [
      {
        label: 'Goals Scored',
        data: [2, 3, 1, 4, 2],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Goals Conceded',
        data: [1, 1, 2, 1, 0],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
    ],
  };

  // Player Performance Data
  const playerPerformanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Average Rating',
        data: [7.5, 8.2, 7.8, 8.5, 8.1],
        borderColor: 'rgb(16, 185, 129)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Statistics</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Team and player performance analytics
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-2 bg-primary-50">
                <BarChart2 className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-500">Win Rate</p>
                <p className="text-xl font-semibold text-neutral-900">68%</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-2 bg-secondary-50">
                <TrendingUp className="h-5 w-5 text-secondary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-500">Goals Scored</p>
                <p className="text-xl font-semibold text-neutral-900">32</p>
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
                <p className="text-sm font-medium text-neutral-500">Clean Sheets</p>
                <p className="text-xl font-semibold text-neutral-900">8</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-2 bg-success-50">
                <Users className="h-5 w-5 text-success-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-500">Squad Rating</p>
                <p className="text-xl font-semibold text-neutral-900">7.8</p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <Card.Title>Team Performance</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="h-80">
              <Bar
                data={teamPerformanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Player Performance Trend</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="h-80">
              <Line
                data={playerPerformanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      min: 5,
                      max: 10,
                    },
                  },
                }}
              />
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Team Stats Table */}
      <Card>
        <Card.Header>
          <Card.Title>Team Statistics</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    Possession
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    58%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-success-600">
                    <TrendingUp className="h-4 w-4 inline" /> +2.3%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    Pass Accuracy
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    87%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-success-600">
                    <TrendingUp className="h-4 w-4 inline" /> +1.5%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    Shot Accuracy
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    45%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-error-600">
                    <TrendingUp className="h-4 w-4 inline rotate-180" /> -1.2%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default StatisticsPage;