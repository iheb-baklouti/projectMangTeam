import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import { useCrud } from '../../contexts/CrudContext';
import Swal from 'sweetalert2';

interface CrudButtonsProps {
  resource: string;
  id?: string;
  onEdit?: () => void;
  onAdd?: () => void;
  className?: string;
}

const CrudButtons: React.FC<CrudButtonsProps> = ({
  resource,
  id,
  onEdit,
  onAdd,
  className = '',
}) => {
  const { hasPermission, delete: deleteResource } = useCrud();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed && id) {
      const response = await deleteResource(resource, id);
      
      if (response.success) {
        await Swal.fire(
          'Deleted!',
          'The item has been deleted.',
          'success'
        );
        window.location.reload();
      } else {
        await Swal.fire(
          'Error!',
          response.error || 'Something went wrong',
          'error'
        );
      }
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {onAdd && hasPermission('create', resource) && (
  <Button
    variant="primary"
    size="sm"
    onClick={onAdd}
    leftIcon={<Plus size={16} />}
  >
    Add
  </Button>
)}
      
      {id && hasPermission('update', resource) && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
          leftIcon={<Pencil size={16} />}
        >
          Edit
        </Button>
      )}
      
      {id && hasPermission('delete', resource) && (
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          leftIcon={<Trash2 size={16} />}
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default CrudButtons;