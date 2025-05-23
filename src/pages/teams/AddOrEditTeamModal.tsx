import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Team } from "../../types";
import Input from "../../components/ui/input";
import Button from "../../components/ui/Button";
import { teamsService } from "../../services/teams";
import { DialogWrapper } from "../../components/ui/DialogWrapper";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (team: Team) => void;
  defaultValues?: Team;
  associationId: string;
};

const AddOrEditTeamModal = ({
  open,
  onClose,
  onSuccess,
  defaultValues,
  associationId,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Team>({
    defaultValues: defaultValues || {},
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset({});
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: Team) => {
    try {
      let res;
      if (defaultValues?._id) {
        res = await teamsService.updateTeam(defaultValues._id, data);
        Swal.fire("Succès", "Équipe mise à jour avec succès", "success");
      } else {
        res = await teamsService.createTeam({ ...data, associationId });
        Swal.fire("Succès", "Équipe créée avec succès", "success");
      }

      onSuccess(res?.data);
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire("Erreur", "Une erreur s’est produite lors de l’enregistrement.", "error");
    }
  };

  return (
    <DialogWrapper open={open} onClose={onClose} title={defaultValues ? "Modifier une équipe" : "Ajouter une équipe"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Nom" {...register("name", { required: true })} />
        <Input label="Pays" {...register("country")} />
        <Input label="Ville" {...register("city")} />
        <Input label="Stade" {...register("venue")} />
        <Input label="Division" {...register("division")} />
        <Input label="Type" {...register("type")} />
        <Input label="Sport" {...register("sport_type")} />
        <Input label="Année de création" type="number" {...register("founded")} />

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {defaultValues ? "Enregistrer" : "Créer"}
          </Button>
        </div>
      </form>
    </DialogWrapper>
  );
};

export default AddOrEditTeamModal;
