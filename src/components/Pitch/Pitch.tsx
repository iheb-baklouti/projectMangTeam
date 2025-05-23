import React from 'react';
import './Pitch.css';
import { mockPlayers } from '../../data/mockData';


type PlayerPosition = {
  position: string;
  playerId: string;
};

type Props = {
  formation: string;
  playerPositions: PlayerPosition[];
};

const pitchLayout: Record<string, { top: string; left: string }[]> = {
  '4-3-3': [
    { top: '85%', left: '45%' },
    { top: '70%', left: '15%' },
    { top: '70%', left: '35%' },
    { top: '70%', left: '55%' },
    { top: '70%', left: '75%' },
    { top: '50%', left: '30%' },
    { top: '50%', left: '50%' },
    { top: '50%', left: '70%' },
    { top: '30%', left: '20%' },
    { top: '30%', left: '50%' },
    { top: '30%', left: '80%' },
  ],
  '4-4-2': [
    { top: '85%', left: '45%' },
    { top: '70%', left: '15%' },
    { top: '70%', left: '35%' },
    { top: '70%', left: '55%' },
    { top: '70%', left: '75%' },
    { top: '50%', left: '20%' },
    { top: '50%', left: '40%' },
    { top: '50%', left: '60%' },
    { top: '50%', left: '80%' },
    { top: '30%', left: '35%' },
    { top: '30%', left: '65%' },
  ],
};

const Pitch: React.FC<Props> = ({ formation, playerPositions }) => {
  const layout = pitchLayout[formation] || [];

  return (
    <div className="pitch">
      {layout.map((pos, index) => {
        const player = mockPlayers.find(p => p.id === playerPositions[index]?.playerId);
        return (
          <div
            key={index}
            className="player-icon animate-position"
            style={{ top: pos.top, left: pos.left }}
          >
            <div className="text-center">
              <div className="text-xs leading-none font-bold">
                #{player?.jerseyNumber || '?'}
              </div>
              <div className="text-[10px] leading-none">
                {player?.lastName || '?'}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Pitch;