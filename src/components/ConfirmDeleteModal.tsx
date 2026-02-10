import { X } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  recipeName: string;
}

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  recipeName,
}: ConfirmDeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#3A2A1A]">
            Delete Recipe?
          </h2>
          <p className="text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold">"{recipeName}"</span>? This action
            cannot be undone.
          </p>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 text-sm font-semibold rounded-md border border-[#D4C8BE] bg-white px-4 py-2 text-[#3A2A1A] hover:bg-[#D4C8BE] transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-md px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDeleteModal;
