import toast from "react-hot-toast";
import { CheckCircleIcon, ExclamationCircleIcon, XIcon, InformationCircleIcon, StatusOnlineIcon } from "@heroicons/react/outline";

export default function useToast() {
  function pushToast({ message, isError, isLoading }) {
    if (!isError && !isLoading) {
      toast.success(<span className="text-sm font-semibold">{message}</span>, {
        duration: 2000,
        position: "top-center",
      });
    } else if (!isLoading) {
      toast.error(<span className="text-sm font-semibold">{message}</span>, {
        id: message,
        position: "top-center",
      });
    } else {
      return toast.loading(
        <span className="text-sm font-semibold">{message}</span>,
        {
          position: "top-center",
        }
      );
    }
  };

  function pushCustomToast({ title, message, isError, isSuccess, isLoading }) {
    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-xs w-full bg-white dark:bg-neutral-800 shadow-lg rounded-lg flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 py-2 px-3">
            <div className="flex items-center">
              {isError ?
                <div className="bg-red-500 flex items-center rounded-full">
                  <ExclamationCircleIcon className="w-7 h-7 text-white" />
                </div>
                : isSuccess ?
                  <div className="bg-teal-500 flex items-center rounded-full">
                    <CheckCircleIcon className="w-7 h-7 text-white" />
                  </div>
                  : isLoading ?
                    // <div className="bg-orange-500 flex items-center rounded-full p-0.5">
                    //   <svg xmlns="http://www.w3.org/2000/svg" role="status" className="w-6 h-6 inline text-white animate-[spin_1.5s_linear_infinite] duration-200"
                    //     viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                    //   </svg>
                    // </div>
                    <div className="bg-orange-500 flex items-center rounded-full p-0.5">
                      <StatusOnlineIcon className="w-6 h-6 text-white animate-[spin_1.5s_linear_infinite] duration-200" />
                    </div>
                    :
                    <div className="bg-sky-500 flex items-center rounded-full">
                      <InformationCircleIcon className="w-7 h-7 text-white" />
                    </div>
              }
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {title}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex p-2">
            {!isLoading &&
              <button
                onClick={() => toast.remove(t.id)}
                className="dark:text-neutral-300 dark:hover:text-white text-neutral-600 hover:text-neutral-900 transition-all flex items-center justify-center text-sm font-medium"
              >
                <XIcon className="h-5 w-5" />
              </button>
            }
          </div>
        </div>
      ),
      {
        duration: 2000,
        position: "top-right",
      }
    )
  }

  function updateToast({ toastId, message, isError }) {
    if (!isError) {
      toast.success(<span className="text-sm font-semibold">{message}</span>, {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });
    } else {
      toast.error(<span className="text-sm font-semibold">{message}</span>, {
        id: toastId,
        position: "top-center",
      });
    }
  };

  function updateCustomToast({ toastId, title, message, isError }) {
    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-xs w-full bg-white dark:bg-neutral-800 shadow-lg rounded-lg flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 py-2 px-3">
            <div className="flex items-center">
              {isError ?
                <div className="bg-red-500 flex items-center rounded-full">
                  <ExclamationCircleIcon className="w-7 h-7 text-white" />
                </div>
                :
                <div className="bg-teal-500 flex items-center rounded-full">
                  <CheckCircleIcon className="w-7 h-7 text-white" />
                </div>
              }
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {title}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        id: toastId,
        // duration: 1000,
        position: "top-right",
      }
    )
  };

  function dismissToast() {
    toast.dismiss();
  };

  function dismissCustomToast() {
    toast.remove();
  };

  return { updateToast, pushToast, dismissToast, pushCustomToast, updateCustomToast, dismissCustomToast };
}
