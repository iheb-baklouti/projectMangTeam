// ✅ PlayersPage.tsx avec filtres, avatars maillots, pagination et export CSV
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download } from 'lucide-react';
import Card from '../../components/ui/Card';
import { useCrud } from '../../contexts/CrudContext';
import CrudButtons from '../../components/crud/CrudButtons';
import CrudModal from '../../components/crud/CrudModal';
import { Player, Team } from '../../types';
import Swal from 'sweetalert2';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { nationalityOptions, positionOptions, strongFootOptions } from '../../data/nationalities';
import { utils, writeFile } from 'xlsx';

const PlayersPage = () => {
  const { read, create, update } = useCrud();
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedNationality, setSelectedNationality] = useState('all');
  const [selectedFoot, setSelectedFoot] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [formData, setFormData] = useState({
    jerseyNumber: '',
    position: '',
    nationality: '',
    birthDate: '',
    height: '',
    weight: '',
    strongFoot: 'right',
  });

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const playersResult = await read<Player>('player');
    const teamsResult = await read<Team>('team');
    if (playersResult.success && Array.isArray(playersResult.data)) setPlayers(playersResult.data);
    if (teamsResult.success && Array.isArray(teamsResult.data)) setTeams(teamsResult.data);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (players.some(p => p.jerseyNumber.toString() === formData.jerseyNumber && (!editingPlayer || p.id !== editingPlayer.id))) {
      Swal.fire({ icon: 'error', title: 'Duplicate Jersey Number', text: 'Another player already has this number.' });
      return;
    }
    setIsLoading(true);
    const data = { ...formData, teamId: selectedTeam === 'all' ? teams[0]?.id : selectedTeam };
    const result = editingPlayer
      ? await update<Player>('player', editingPlayer.id, data)
      : await create<Player>('player', data);
    if (result.success) {
      await Swal.fire({ icon: 'success', title: `Player ${editingPlayer ? 'updated' : 'created'} successfully!`, timer: 1500 });
      setIsModalOpen(false);
      setEditingPlayer(null);
      loadData();
    } else {
      await Swal.fire({ icon: 'error', title: 'Oops...', text: result.error || 'Something went wrong!' });
    }
    setIsLoading(false);
  };

  const exportCSV = () => {
    const rows = players.map(p => ({
      ID: p.id,
      Jersey: p.jerseyNumber,
      Position: p.position,
      Nationality: p.nationality,
      BirthDate: p.birthDate,
      Height: p.height,
      Weight: p.weight,
      StrongFoot: p.strongFoot,
      Team: teams.find(t => t.id === p.teamId)?.name || ''
    }));
    const ws = utils.json_to_sheet(rows);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Players');
    writeFile(wb, 'players.csv');
  };

  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
    setFormData({
      jerseyNumber: player.jerseyNumber.toString(),
      position: player.position,
      nationality: player.nationality,
      birthDate: player.birthDate,
      height: player.height?.toString() || '',
      weight: player.weight?.toString() || '',
      strongFoot: player.strongFoot,
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPlayer(null);
    setFormData({ jerseyNumber: '', position: '', nationality: '', birthDate: '', height: '', weight: '', strongFoot: 'right' });
    setIsModalOpen(true);
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.userId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || player.teamId === selectedTeam;
    const matchesPosition = selectedPosition === 'all' || player.position === selectedPosition;
    const matchesNationality = selectedNationality === 'all' || player.nationality === selectedNationality;
    const matchesFoot = selectedFoot === 'all' || player.strongFoot === selectedFoot;
    return matchesSearch && matchesTeam && matchesPosition && matchesNationality && matchesFoot;
  });

  const paginatedPlayers = filteredPlayers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Players</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage and view all players in the club</p>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={exportCSV} className="btn btn-outline btn-sm flex gap-2 items-center"><Download size={16} /> Export CSV</button>
          <CrudButtons resource="player" onAdd={handleAdd} />
        </div>
      </div>

      <Card>
        <Card.Content className="space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Search players..." className="input input-bordered w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Select options={[{ label: 'All Teams', value: 'all' }, ...teams.map(t => ({ label: t.name, value: t.id }))]} onChange={(opt) => setSelectedTeam(opt?.value || 'all')} placeholder="Team" menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }} isClearable />
            <Select options={[{ label: 'All Positions', value: 'all' }, ...positionOptions]} onChange={(opt) => setSelectedPosition(opt?.value || 'all')} placeholder="Position"  menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }} isClearable />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select options={[{ label: 'All Nationalities', value: 'all' }, ...nationalityOptions]} onChange={(opt) => setSelectedNationality(opt?.value || 'all')} placeholder="Nationality" menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }} isClearable />
            <Select options={[{ label: 'All Strong Foot', value: 'all' }, ...strongFootOptions]} onChange={(opt) => setSelectedFoot(opt?.value || 'all')} placeholder="Strong Foot" menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }} isClearable />
          </div>
        </Card.Content>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPlayers.map(player => (
          <Card key={player.id} className="transition-all hover:shadow-lg rounded-xl border border-neutral-200">
            <Card.Content className="p-4">
              <div className="flex items-center gap-4">
                <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${player.jerseyNumber}`} alt="avatar" className="w-14 h-14 rounded-full border" />
                <div>
                  <h2 className="text-lg font-semibold">{player.userId || 'Player Name'}</h2>
                  <p className="text-sm text-neutral-500">{player.position}</p>
                  <p className="text-sm text-neutral-400">{teams.find(t => t.id === player.teamId)?.name || 'No Team'}</p>
                </div>
              </div>
              <div className="mt-4 border-t pt-4">
                <CrudButtons resource="player" id={player.id} onEdit={() => handleEdit(player)} onAdd={undefined} />
<Link
  to={`/players/${player.id}`}
  className="btn btn-secondary btn-sm w-full flex justify-center items-center gap-2"
>
  👁️ Show Details
</Link>

              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE) }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-700'}`}>
            {i + 1}
          </button>
        ))}
      </div>

      <CrudModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPlayer ? 'Edit Player' : 'Add Player'} onSubmit={handleSubmit} isLoading={isLoading}>
        <div className="space-y-4">
          <input type="number" placeholder="Jersey Number" className="input input-bordered w-full" required value={formData.jerseyNumber} onChange={(e) => setFormData({ ...formData, jerseyNumber: e.target.value })} />
          <Select options={positionOptions} value={positionOptions.find(opt => opt.value === formData.position)} onChange={(opt) => setFormData({ ...formData, position: opt?.value || '' })} placeholder="Select position" menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }} isSearchable />
          <Select options={nationalityOptions} value={nationalityOptions.find(opt => opt.value === formData.nationality)} onChange={(opt) => setFormData({ ...formData, nationality: opt?.value || '' })} placeholder="Select nationality" menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }} isSearchable />
          <DatePicker selected={formData.birthDate ? new Date(formData.birthDate) : null} onChange={(date: Date) => setFormData({ ...formData, birthDate: date.toISOString().split('T')[0] })} dateFormat="yyyy-MM-dd" className="input input-bordered w-full" placeholderText="Select birth date" />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Height (cm)" className="input input-bordered w-full" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} />
            <input type="number" placeholder="Weight (kg)" className="input input-bordered w-full" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} />
          </div>
          <Select options={strongFootOptions} value={strongFootOptions.find(opt => opt.value === formData.strongFoot)} onChange={(opt) => setFormData({ ...formData, strongFoot: opt?.value || 'right' })} placeholder="Select strong foot" menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }} isSearchable />
        </div>
      </CrudModal>
    </div>
  );
};

export default PlayersPage;
