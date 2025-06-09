import { showToast } from "@/components/common/errors";
import { DeleteModalProps } from "@/lib/types/table";
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XCircle, XIcon } from "lucide-react";
import { Fragment, useState } from "react";

export default function DeleteModal({
  deleteService,
  showDeleteModal,
  setShowDeleteModal,
  deleteMessage,
  headerTitle,
  buttonName,
  deleteIdArr,
  onSuccessDeleteCallBack,
  onCancel,
  customDeleteHandler,
  isLoading,
  errors,
  hideToast,
}: DeleteModalProps) {
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
  const [deleteErrors, setDeleteErrors] = useState<any>(null);

  const deleteHandler = () => {
    setDeleteLoader(true);
    const Promises: any[] = [];
    if (deleteIdArr) {
      deleteIdArr.forEach((deleteId: string) => {
        Promises.push(deleteService(deleteId));
      });
    }
    Promise.all(Promises)
      .then((promiseResponse) => {
        const all204 = promiseResponse.every(
          (res) => res?.status === 204
        );
        if(all204){
          setShowDeleteModal(false);
          setDeleteErrors(null);
          if (onSuccessDeleteCallBack) {
            onSuccessDeleteCallBack(deleteIdArr);
          }
          showToast("Success", "Deletion successfully completed");
          return;
        }
        if (promiseResponse.filter((item) => item && item?.errors).length) {
          const errorsArr = promiseResponse.filter((errItem) => errItem?.errors);
          let newData: string[] = [];
          errorsArr?.map(({ errors }) => {
            if (typeof errors === "string") {
              newData.push(errors);
            } else if (Array.isArray(errors)) {
              newData = [...newData, ...errors];
            } else {
              Object.keys(errors).forEach((item) => {
                newData.push(errors[item]);
              });
            }
          });
          setDeleteErrors(newData);
        } else if (promiseResponse.filter((item) => item?.nonFieldErrors)) {
          //NFerrors as in non field errors
          const NFerrors = promiseResponse.filter(
            (item) => item?.nonFieldErrors
          );
          const newErrorData: string[] = [];
          NFerrors?.map((NFerror) => {
            newErrorData.push(NFerror.nonFieldErrors);
          });
          setDeleteErrors(newErrorData);
        } else {
          setShowDeleteModal(false);
          setDeleteErrors(null);
          if (onSuccessDeleteCallBack) {
            onSuccessDeleteCallBack(deleteIdArr);
          }
          showToast("Success", "Deletion successfully completed");
        }
      })
      .catch((errors) => {
        console.log(errors, "Errors in deletion");
      })
      .finally(() => {
        setDeleteLoader(false);
      });
  };

  return (
    <div className="">
      <Transition show={showDeleteModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[99999] overflow-y-auto"
          onClose={() => {
            setShowDeleteModal(false);
            setTimeout(() => {
              setDeleteErrors([]);
            }, 500);
            if (onCancel) {
              onCancel();
            }
          }}
        >
          <div className="flex min-h-screen items-center justify-center px-4 pb-20  bg-black/50  text-center sm:block sm:p-0">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block max-w-[35%]  transform space-y-3 overflow-hidden rounded-lg bg-white p-5  text-left align-bottom shadow-xl transition-all dark:bg-[#2d2e2e] dark:text-white sm:my-8 sm:w-full sm:max-w-md  sm:align-middle">
                <div className="w-full text-ellipsis  text-center items-center">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium flex justify-between w-full px-1"
                  >
                    <div> {headerTitle || "Delete Consent"}</div>
                    <button
                      type="button"
                      className="w-10 h-10 hover:bg-gray-100 rounded-md p-2"
                      onClick={() => {
                        setShowDeleteModal(false);
                        setTimeout(() => {
                          setDeleteErrors([]);
                        }, 500);
                        if (onCancel) {
                          onCancel();
                        }
                      }}
                    >
                      <XIcon className="w-6 h-6" />
                    </button>
                  </DialogTitle>
                </div>

                <div className="mt-2 p-3 text-center w-full h-max text-lg">
                  {deleteMessage}
                </div>

                {deleteErrors && deleteErrors.length > 0
                  ? deleteErrors.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="w-full rounded-md bg-red-50 p-4"
                      >
                        <div className="m-3 flex">
                          <div className="flex-shrink-0">
                            <XIcon
                              className="h-5 w-5 text-red-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                              {item}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
                {errors && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <XCircle
                          className="h-5 w-5 text-red-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <h3
                          id="delete-error"
                          className="text-sm font-medium text-red-800"
                        >
                          {deleteErrors}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-5 sm:mt-6">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowDeleteModal(false);
                        setTimeout(() => {
                          setDeleteErrors([]);
                        }, 500);
                        if (onCancel) {
                          onCancel();
                        }
                      }}
                      id="delete-cancel"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-50 px-4 py-2 text-base font-medium text-gray-900 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={customDeleteHandler || deleteHandler}
                      id="delete-submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm   hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500  focus:ring-offset-2 sm:text-sm items-center "
                    >
                      {(isLoading || deleteLoader) && (
                        <div className="flex items-center justify-center ">
                          <div className="mr-2 h-3 w-3 animate-spin rounded-full border-b-2 border-gray-50" />
                        </div>
                      )}
                      {buttonName || "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
