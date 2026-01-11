import React from "react";
import { IoIosCheckmark } from "react-icons/io";

interface ToastProps {
  header: string;
  message: string;
  variant: "success" | "error";
}

export const useToast = () => {
  const customToast = ({ header, message, variant }: ToastProps) => {
    return (
      <div
        {...{
          className: `flex flex-row  items-center gap-4 p-4 rounded-lg w-[400px] ${
            variant === "success" ? "bg-green-100" : "bg-red-100"
          }`,
        }}
      >
        <div
          {...{
            className: ` flex justify-center items-center w-[50px] h-[40px] rounded-md ${
              variant === "success" ? "bg-green-700" : "bg-red-700"
            }`,
          }}
        >
          <IoIosCheckmark {...{ className: "w-[40px] h-[40px] text-white" }} />
        </div>
        <div {...{ className: "flex flex-col gap-2" }}>
          <span {...{ className: "font-mono font-bold text-black text-md" }}>
            {header}
          </span>

          <span {...{ className: "font-mono text-black text-xs" }}>
            {message}
          </span>
        </div>
      </div>
    );
  };

  return { customToast };
};
