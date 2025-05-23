import React, { useEffect, useState } from "react";
import { Team } from "../../types";
import Button from "../../components/ui/Button";
import { Plus, Search, FileDown } from "lucide-react";
import CsvDownloader from "react-csv-downloader";
import { teamsService } from "../../services/teams";
import Input from "../../components/ui/input";
import AddOrEditTeamModal from "./AddOrEditTeamModal";
import Swal from "sweetalert2";

const TeamsPage = () => {
  const associationId = "682e2e9d79081161fa91db68";

  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    if (!associationId) return;
    const fetchTeams = async () => {
      const res = await teamsService.getAllTeams(associationId);
      setTeams(res.data.teams);
      setFilteredTeams(res.data.teams);
    };
    fetchTeams();
  }, [associationId]);

  useEffect(() => {
    const filtered = teams.filter((team) => {
      return (
        team.name?.toLowerCase().includes(search.toLowerCase()) &&
        team.country?.toLowerCase().includes(countryFilter.toLowerCase())
      );
    });
    setFilteredTeams(filtered);
  }, [search, countryFilter, teams]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Supprimer cette équipe ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      try {
        await teamsService.deleteTeam(id);
        setTeams((prev) => prev.filter((team) => team._id !== id));
        Swal.fire("Supprimé !", "L’équipe a été supprimée.", "success");
      } catch (error) {
        Swal.fire("Erreur", "Impossible de supprimer l’équipe.", "error");
      }
    }
  };

  const handleEdit = (team: Team) => {
    setSelectedTeam(team);
    setOpen(true);
  };

  const handleSuccess = (newTeam: Team) => {
    if (selectedTeam) {
      // Édition
      setTeams((prev) =>
        prev.map((team) => (team._id === newTeam._id ? newTeam : team))
      );
    } else {
      // Création
      setTeams((prev) => [newTeam, ...prev]);
    }
    setOpen(false);
    setSelectedTeam(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Équipes</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Rechercher une équipe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
            icon={<Search size={16} />}
          />
          <Input
            placeholder="Filtrer par pays"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="w-52"
          />
          <Button onClick={() => setOpen(true)} leftIcon={<Plus size={16} />}>
            Ajouter
          </Button>
          <CsvDownloader
            filename="teams_export"
            columns={[
              { id: "name", displayName: "Nom" },
              { id: "country", displayName: "Pays" },
              { id: "city", displayName: "Ville" },
              { id: "venue", displayName: "Stade" },
              { id: "division", displayName: "Division" },
              { id: "type", displayName: "Type" },
              { id: "sport_type", displayName: "Sport" },
            ]}
            datas={filteredTeams.map((team) => ({
              name: team.name ?? "",
              country: team.country ?? "",
              city: team.city ?? "",
              venue: team.venue ?? "",
              division: team.division ?? "",
              type: team.type ?? "",
              sport_type: team.sport_type ?? "",
            }))}
          >
            <Button leftIcon={<FileDown size={16} />}>Exporter</Button>
          </CsvDownloader>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div
            key={team._id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition-all"
          >
            <h2 className="text-lg font-semibold">{team.name}</h2>
            <p className="text-sm text-neutral-600">
              {team.city}, {team.country}
            </p>
            <p className="text-sm text-neutral-500">
              {team.division} • {team.sport_type}
            </p>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={() => handleEdit(team)}>
                Modifier
              </Button>
              <Button variant="danger" onClick={() => handleDelete(team._id!)}>
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AddOrEditTeamModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedTeam(null);
        }}
        defaultValues={selectedTeam || undefined}
        onSuccess={handleSuccess}
        associationId={associationId}
      />
    </div>
  );
};

export default TeamsPage;
