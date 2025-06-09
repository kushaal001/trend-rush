import { cn } from "@/lib/utils";
import { GenericFormModalProps } from "@/lib/types/generics";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Loader2, X } from "lucide-react";
import { Fragment } from "react";

export function GenericFormModal({
  formModal,
  closeFormModal,
  modalTitle,
  children,
  modalWidth,
  isLoading = false,
  onCancel,
}: GenericFormModalProps) {

  return (
    <Dialog open={formModal} onClose={closeFormModal} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <DialogPanel
          className={cn(
            modalWidth,
            "relative transform whitespace-pre-wrap break-all rounded-md bg-white text-left shadow-xl transition-all sm:w-full p-3 overflow-y-auto max-h-[80vh]"
          )}
        >
          {/* Modal Header */}
          <DialogTitle
            as="h1"
            className="py-2 px-4 leading-6 flex items-center justify-between w-full text-md font-bold text-black"
          >
            {modalTitle}
            <button
              type="button"
              className="rounded-md text-gray-900 w-10 h-10 flex items-center justify-center hover:text-gray-950 focus:outline-none border"
              onClick={() => {
                closeFormModal();
                if (onCancel) {
                  onCancel();
                }
              }}
            >
              <X className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </button>
          </DialogTitle>

          {/* Modal Content */}
          <div className="bg-white p-4">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader2 className="h-10 w-10 animate-spin text-gray-950" />
              </div>
            ) : (
              children
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
