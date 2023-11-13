import React, { useState, createContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { RxCross1 } from "react-icons/rx";

type ToastType = "success" | "error" | "warning" | "info";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
  time: number;
};

type ToastContextType = {
  setToast: (message: string, type: ToastType, identifier?: string) => void;
};

const ToastContext = createContext({} as ToastContextType);
export const ToastContest = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState([] as Toast[]);

  const setToast = (message: string, type: ToastType, identifier?: string) => {
    setToasts((prevToast) => {
      const clone = [...prevToast];

      const existingIndex = prevToast.findIndex((t) => t.id === identifier);

      if (existingIndex !== -1) {
        clone[existingIndex] = {
          message,
          type,
          id: clone[existingIndex].id,
          time: Date.now(),
        };
        return [...clone];
      }

      const toast = {
        message,
        type,
        id: identifier || uuidv4(),
        time: Date.now(),
      };
      return [...clone, toast];
    });
  };

  const removeToast = (id: string) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        const oldestToast = toasts[0];

        if (Date.now() - oldestToast.time > 5000) {
          removeToast(oldestToast.id);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [toasts]);

  const contextData = {
    setToast,
  };

  const toastClasses = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-blue-500";
    }
  };
  return (
    <ToastContext.Provider value={contextData}>
      <div>
        {toasts.map((toast, index) => {
          return (
            <div
              key={index}
              style={{ bottom: `${index * 4}rem` }}
              className={`${toastClasses(
                toast.type
              )} mb-8 absolute ms-4 right-4 rounded-md py-4 px-8 z-[999] flex gap-4 text-slate-200`}
            >
              {toast.message}
              <button
                type="button"
                className="text-gray-600 text-lg"
                onClick={() => removeToast(toast.id)}
              >
                <RxCross1 />
              </button>
            </div>
          );
        })}
      </div>
      {children}
    </ToastContext.Provider>
  );
};


export default ToastContext;
