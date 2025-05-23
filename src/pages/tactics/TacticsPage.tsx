// ✅ TacticsPage.tsx modernisé avec filtre, CRUD, popin, export CSV, textarea amélioré
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Users, Award, Aperture, Plus, Download } from 'lucide-react';
import Card from '../../components/ui/Card';
import CrudModal from '../../components/crud/CrudModal';
import CrudButtons from '../../components/crud/CrudButtons';
import { mockTacticalStrategies, mockTeams } from '../../data/mockData';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { utils, writeFile } from 'xlsx';

const TacticsPage = () => {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTactic, setEditingTactic] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    formation: '',
    description: '',
    teamId: '',
  });

  const filteredTactics = mockTacticalStrategies.filter(tactic =>
    selectedTeam === 'all' || tactic.teamId === selectedTeam
  );

  const handleAdd = () => {
    setEditingTactic(null);
    setFormData({ name: '', formation: '', description: '', teamId: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (tactic: any) => {
    setEditingTactic(tactic);
    setFormData({
      name: tactic.name,
      formation: tactic.formation,
      description: tactic.description,
      teamId: tactic.teamId,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    await Swal.fire({ icon: 'success', title: `Tactic ${editingTactic ? 'updated' : 'created'}!`, timer: 1500 });
  };

  const exportCSV = () => {
    const rows = mockTacticalStrategies.map(t => ({
      Name: t.name,
      Formation: t.formation,
      Description: t.description,
      Team: mockTeams.find(team => team.id === t.teamId)?.name || '',
      Players: t.playerPositions?.length || 0,
      Updated: new Date(t.lastUpdated).toLocaleDateString(),
    }));
    const ws = utils.json_to_sheet(rows);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Tactics');
    writeFile(wb, 'tactics.csv');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Tactical Strategies</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage and analyze team tactics</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button onClick={exportCSV} className="btn btn-outline btn-sm flex gap-2 items-center">
            <Download size={16} /> Export CSV
          </button>
          <button onClick={handleAdd} className="btn btn-primary flex gap-2 items-center">
            <Plus size={16} /> Create New Strategy
          </button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <Card.Content className="p-4">
          <div className="w-full md:w-1/3">
            <Select
              options={[{ value: 'all', label: 'All Teams' }, ...mockTeams.map(t => ({ value: t.id, label: t.name }))]}
              value={mockTeams.find(t => t.id === selectedTeam) ? { value: selectedTeam, label: mockTeams.find(t => t.id === selectedTeam)?.name } : { value: 'all', label: 'All Teams' }}
              onChange={(opt) => setSelectedTeam(opt?.value || 'all')}
              placeholder="Select team"
              isSearchable
              menuPortalTarget={document.body}
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            />
          </div>
        </Card.Content>
      </Card>

      {/* Tactics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTactics.map((tactic) => (
          <Card key={tactic.id} className="hover:shadow-lg rounded-xl border border-neutral-200 transition-all">
            <Card.Content className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                  <Aperture className="h-6 w-6" />
                </div>
                <div>
                  <Link to={`/tactics/${tactic.id}`}>
                    <h3 className="text-lg font-medium text-neutral-900 hover:text-primary-600">{tactic.name}</h3>
                  </Link>
                  <p className="text-sm text-neutral-500">{tactic.formation}</p>
                </div>
              </div>

              <p className="text-sm text-neutral-600 line-clamp-2">{tactic.description}</p>

              <div className="flex justify-between items-center text-sm text-neutral-500">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {tactic.playerPositions?.length || 0} Players
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  {mockTeams.find(t => t.id === tactic.teamId)?.name}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-400">
                <span>Last updated {new Date(tactic.lastUpdated).toLocaleDateString()}</span>
                <CrudButtons resource="tactic" id={tactic.id} onEdit={() => handleEdit(tactic)} />
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={<><Aperture className="inline mr-2" />{editingTactic ? 'Edit Tactic' : 'Add Tactic'}</>}
        onSubmit={handleSubmit}
        isLoading={false}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700">Tactic Name</label>
            <input type="text" placeholder="e.g. High Press 4-3-3" required className="input input-bordered w-full" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Formation</label>
            <input type="text" placeholder="e.g. 4-3-3" className="input input-bordered w-full" value={formData.formation} onChange={(e) => setFormData({ ...formData, formation: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Description</label>
            <textarea placeholder="Describe this tactic..." className="textarea textarea-bordered w-full focus:ring-primary-500 focus:border-primary-500 min-h-[120px] resize-none" rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Team</label>
            <Select
              options={mockTeams.map(t => ({ label: t.name, value: t.id }))}
              value={mockTeams.find(t => t.id === formData.teamId) ? { label: mockTeams.find(t => t.id === formData.teamId)?.name, value: formData.teamId } : null}
              onChange={(opt) => setFormData({ ...formData, teamId: opt?.value || '' })}
              placeholder="Select team"
              isSearchable
              menuPortalTarget={document.body}
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            />
          </div>
        </div>
      </CrudModal>
    </div>
  );
};

export default TacticsPage;
