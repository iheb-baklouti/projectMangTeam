// Superbe design de CrudModal avec inputs modernes, Select2 et DatePicker intégrés
import React from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

interface CrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

const CrudModal: React.FC<CrudModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl ring-1 ring-neutral-200 transition-all duration-300">
        <form onSubmit={onSubmit} className="flex flex-col divide-y divide-neutral-200">
          <div className="flex items-center justify-between px-8 py-6">
            <h3 className="text-2xl font-bold text-neutral-900">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-neutral-400 hover:text-red-500 transition-colors duration-200"
            >
              <X size={22} />
            </button>
          </div>

          <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-6">
              {/* Ajout d'un style cohérent pour tous les champs de formulaire + Select2 + Datepicker */}
              {React.Children.map(children, (child) => (
                <div className="text-sm text-neutral-700 [&_label]:block [&_label]:mb-1 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-neutral-300 [&_input]:px-4 [&_input]:py-2 [&_input]:shadow-sm [&_input]:focus:border-primary-500 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-500 [&_.react-select__control]:rounded-xl [&_.react-select__control]:border-neutral-300 [&_.react-select__control--is-focused]:ring-2 [&_.react-select__control--is-focused]:ring-primary-500 [&_.react-datepicker-wrapper]:w-full">
                  {child}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 px-8 py-6 bg-neutral-50 rounded-3xl">
            <Button
              type="button"
              variant="ghost"
              className="border border-neutral-300 hover:bg-neutral-100 rounded-xl px-5 py-2 text-sm font-medium"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-6 py-2 text-sm font-semibold shadow-md transition duration-200"
              isLoading={isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudModal;
