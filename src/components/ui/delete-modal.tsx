import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DeleteModalProps<T extends { id: string | number }> {
  title?: string;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedValue: T | null;
  setSelectedValue: (value: T | null) => void;
  deleteService: (id: string | number) => Promise<{ errors?: { non_field_errors?: string | string[] } }>;
  fetchData: () => void | Promise<void>;
}

export default function DeleteModal<T extends { id: string | number }>({
  title,
  showModal,
  setShowModal,
  selectedValue,
  setSelectedValue,
  deleteService,
  fetchData,
}: DeleteModalProps<T>) {

  const [deleteError, setDeleteError] = useState<string>("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  function handleClose() {
    setShowModal(false);
    setSelectedValue(null);
    setDeleteError("");
  }

  async function onDelete() {
    if (selectedValue != null) {
      setDeleteLoading(true);
      const { id } = selectedValue;
      await deleteService(id).then(({ errors }) => {
        if (errors != null) {
          if (errors.non_field_errors) {
            setDeleteError(
              Array.isArray(errors.non_field_errors)
                ? errors.non_field_errors.join(" ")
                : errors.non_field_errors,
            );
          }
          setDeleteLoading(false);
        } else {
          void fetchData();
          setShowModal(false);
          setDeleteLoading(false)
        }
      });
    }
  }

  return (
    <Modal
      show={showModal}
      onClose={handleClose}
      width="max-w-lg"
      title={`Delete ${title}`}
    >
      <div className="space-y-2">
        <h1 className="text-gray-950">{`Are you sure want to delete this ${title && title.toLocaleLowerCase()}?`}</h1>
        {deleteError.length > 0 && (
          <p id="deleteError" className="text-left text-lg font-semibold text-red-700 col-span-2">
            {deleteError}
          </p>
        )}
        <div className="col-span-2 flex justify-end space-x-2 max-w-">
          <Button variant="outline" onClick={handleClose} size="sm">
            Cancel
          </Button>
          <Button type="button" onClick={() => onDelete()} variant="destructive" size="sm">
            {deleteLoading && (
              <Loader2 className="size-4 animate-spin text-white mr-2" />
            )}
            <span>Delete</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
