import { cn } from '@/lib/utils';
import { GenericPublishModalProps } from '@/lib/types/generics';
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Globe, XCircleIcon } from 'lucide-react';
import { Fragment, useState } from 'react';

export default function GenericPublishModal({
  publishService,
  showPublishModal,
  setShowPublishModal,
  publishMessage,
  headerTitle,
  buttonName,
  publishIdArr,
  onSuccessDeleteCallBack,
  onCancel,
  errors,
  variant = "success"
}: GenericPublishModalProps) {
  const [publishLoader, setPublishLoader] = useState(false);
  const [publishErrors, setPublishErrors] = useState<string[] | null>(null);

  const bulkPublishHandler = async () => {
    setPublishLoader(true);
    const { errors } = await publishService(publishIdArr);
    if (errors) {
      let newData: string[] = [];
      if (typeof errors === 'string') {
        newData.push(errors);
      } else if (Array.isArray(errors)) {
        newData = [...newData, ...errors];
      } else {
        Object.keys(errors).forEach((item) => {
          newData.push(errors[item]);
        });
      }
      setPublishErrors(newData);
      setPublishLoader(false);
    } else {
      setPublishErrors(null);
      if (onSuccessDeleteCallBack) {
        onSuccessDeleteCallBack(publishIdArr);
      }
      setPublishLoader(false);
      setShowPublishModal(false);
    }
  };

  function backgroundColor() {
    switch (variant) {
      case "success":
        return "bg-green-500";
      case "destructive":
        return "bg-red-500";
      case "primary":
        return "bg-indigo-500";
    }
  }

  return (
    <Transition show={showPublishModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-[99999] inset-0 overflow-y-auto"
        onClose={() => {
          setShowPublishModal(false);
          setTimeout(() => {
            setPublishErrors([]);
          }, 500);
          if (onCancel) {
            onCancel();
          }
        }}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4  pb-20 text-center sm:block sm:p-0">
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
            <div className="relative inline-block align-bottom bg-white dark:bg-[#2d2e2e] dark:text-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 max-w-[35%] sm:align-middle sm:max-w-sm sm:w-full sm:p-6 space-y-3">
              <div>
                <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${backgroundColor()}`}>
                  <Globe className={cn('h-6 w-6 text-white')} aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5 w-full text-ellipsis ">
                  <DialogTitle as="h3" className="text-lg leading-6 font-medium">
                    {headerTitle || 'Publish Consent'}
                  </DialogTitle>
                  <div className="mt-2 w-full line-clamp-2">
                    {publishMessage}
                  </div>
                </div>
              </div>
              {publishErrors && publishErrors.length > 0 ? (
                publishErrors.map((item, index) => (
                  <div key={index} className="rounded-md bg-red-50 p-4 w-full">
                    <div className="flex m-3">
                      <div className="flex-shrink-0">
                        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">{item}</h3>
                      </div>
                    </div>
                  </div>
                ))
              ) : null}
              {errors && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 id="publish-errors" className="text-sm font-medium text-red-800">{publishErrors}</h3>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-5 sm:mt-6">
                <div className="flex space-x-2">
                  <button
                    id="publish-errors"
                    type="button"
                    onClick={() => {
                      setShowPublishModal(false);
                      setTimeout(() => {
                        setPublishErrors([]);
                      }, 500);
                      if (onCancel) {
                        onCancel();
                      }
                    }}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-50 text-base font-medium text-gray-900 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={bulkPublishHandler}
                    className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 sm:text-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${backgroundColor()} hover:bg-opacity-80`}
                  >
                    {publishLoader && (
                      <div className="flex items-center justify-center">
                        <div className="w-3 h-3 border-b-2 mr-2 border-gray-50 rounded-full animate-spin" />
                      </div>
                    )}
                    {buttonName || 'Publish'}
                  </button>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
