// src/contexts/CrudContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Team, Player, Match, TacticalStrategy } from '../types';

import { createPlayer, deletePlayerById, editPlayerById, getAllPlayers } from '../services/players';

// TODO: Ajouter les imports pour matches et strategies si nécessaire

interface CrudContextType {
  teams: Team[];
  players: Player[];
  matches: Match[];
  tacticalStrategies: TacticalStrategy[];

  fetchTeams: () => Promise<void>;
  fetchPlayers: () => Promise<void>;

  createTeam: (data: Team) => Promise<void>;
  updateTeam: (id: string, data: Team) => Promise<void>;
  deleteTeam: (id: string) => Promise<void>;
  updateTeamPlayers: (id: string, players: Player[]) => Promise<void>;

  createPlayer: (data: Player) => Promise<void>;
  updatePlayer: (id: string, data: Player) => Promise<void>;
  deletePlayer: (id: string) => Promise<void>;
}

const CrudContext = createContext<CrudContextType | undefined>(undefined);

export const CrudProvider = ({ children }: { children: React.ReactNode }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [tacticalStrategies, setTacticalStrategies] = useState<TacticalStrategy[]>([]);

  // --- TEAM METHODS ---
  /*const fetchTeams = async () => {
    const data = await getAllTeams();
    setTeams(data);
  };

  const createTeamHandler = async (team: Team) => {
    await createTeam(team);
    await fetchTeams();
  };

  const updateTeamHandler = async (id: string, data: Team) => {
    await editTeamById(id, data);
    await fetchTeams();
  };

  const deleteTeamHandler = async (id: string) => {
    await deleteTeamById(id);
    await fetchTeams();
  };

  const updateTeamPlayersHandler = async (id: string, players: Player[]) => {
    await updateTeamPlayers(id, players);
    await fetchTeams();
  };*/

  // --- PLAYER METHODS ---
  const fetchPlayers = async () => {
    const data = await getAllPlayers();
    setPlayers(data);
  };

  const createPlayerHandler = async (player: Player) => {
    await createPlayer(player);
    await fetchPlayers();
  };

  const updatePlayerHandler = async (id: string, player: Player) => {
    await editPlayerById(id, player);
    await fetchPlayers();
  };

  const deletePlayerHandler = async (id: string) => {
    await deletePlayerById(id);
    await fetchPlayers();
  };

  // --- INIT ---
  useEffect(() => {
    //fetchTeams();
    fetchPlayers();
    // TODO: fetchMatches(); fetchTacticalStrategies();
  }, []);

  return (
    <CrudContext.Provider
      value={{
        teams,
        players,
        matches,
        tacticalStrategies,
       // fetchTeams,
        fetchPlayers,
        //createTeam: createTeamHandler,
        //updateTeam: updateTeamHandler,
        //deleteTeam: deleteTeamHandler,
        //updateTeamPlayers: updateTeamPlayersHandler,
        createPlayer: createPlayerHandler,
        updatePlayer: updatePlayerHandler,
        deletePlayer: deletePlayerHandler
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};

export const useCrud = (): CrudContextType => {
  const context = useContext(CrudContext);
  if (!context) throw new Error('useCrud must be used within a CrudProvider');
  return context;
};
