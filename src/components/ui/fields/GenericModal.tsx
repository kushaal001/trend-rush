"use client";
import { cn } from "@/lib/utils";
import { GenericModalProps } from "@/lib/types/generics";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Loader2, X } from "lucide-react";
import { Fragment } from "react";
import { Button } from "../button";


export default function GenericModal({
  showModal,
  modalTitle,
  children,
  buttonName,
  submitLoader,
  onCancel,
  onSubmit,
  modalWidth,
  setShowModal,
  type = "button",
  isLoading = false,
  submitButton = true,
}: GenericModalProps) {
  return (
    <Transition show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className=" fixed top-0 right-0 left-0 bottom-0 z-[9999]"
        onClose={() => {
          setShowModal(false)
          if (onCancel) {
            onCancel()
          }
        }}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/15 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 w-screen  my-auto top-0 right-0 bottom-0 left-0">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={cn(modalWidth || "max-w-5xl", 'relative transform  whitespace-pre-wrap break-all rounded-3xl bg-white text-left shadow-xl  transition-all sm:w-full overflow-y-auto max-h-[90vh]')}
              >
                <div
                  className={cn(" w-full")}
                >
                  <DialogTitle
                    as="h1"
                    className={cn(
                      " py-4 px-4 border-b  leading-6 flex items-center justify-between w-full ",
                      "md:2xl text-md font-bold text-black"
                    )}
                  >
                    {modalTitle}
                    <button
                      type="button"
                      className="rounded-[10px] text-gray-900 w-10 h-10 flex items-center justify-center hover:text-gray-950 focus:border-none border"
                      onClick={() => {
                        setShowModal(false)
                        if (onCancel) {
                          onCancel()
                        }
                      }}
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">button</span>
                    </button>
                  </DialogTitle>
                  <div className="bg-white px-4 pb-5">    {
                    isLoading ? (
                      <div className={`flex justify-center items-center ${isLoading ? "block" : "hidden "}`}>
                        <Loader2 className="h-10 w-10 animate-spin text-gray-950" />
                      </div>
                    ) : (
                      children
                    )}</div>
                </div>
                {submitButton && (
                  <div className="flex justify-end ml-auto gap-5 p-4">
                    <Button
                      id="modal-cancel"
                      variant="destructive"
                      onClick={() => {
                        setShowModal(false)
                        if (onCancel) {
                          onCancel()
                        }
                      }}
                      disabled={submitLoader}
                    >
                      Cancel
                    </Button>
                    <Button type={type} variant="default" id="modal-submit" onClick={() => {
                      if (onSubmit) {
                        onSubmit()
                      }
                    }} className="" disabled={submitLoader}>
                      {submitLoader && (
                        <Loader2
                          className="mr-2 h-6 w-6 animate-spin"
                        />
                      )}
                      {buttonName || "Submit"}</Button>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
