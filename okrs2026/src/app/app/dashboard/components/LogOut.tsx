import { t } from "i18next";
import { signOut } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { ScreenModal } from "../../components/ScreenModal";

export const LogOut = ({ name }: { name: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = useCallback(() => {
    signOut({ callbackUrl: "/auth/login" });
  }, []);

  return (
    <>
      <div
        {...{
          className:
            "flex text-white gap-4 border-t border-gray-500 p-3 justify-center lg:justify-start",
        }}
      >
        <button
          {...{
            onClick: () => setIsModalOpen(true),
            className: "lg:hidden",
          }}
        >
          <FaCircleUser
            {...{
              className:
                "w-[40px] h-[40px] hover:text-slate-400 cursor-pointer",
            }}
          />
        </button>
        <div {...{ className: "hidden lg:flex gap-4" }}>
          <FaCircleUser {...{ className: "w-[40px] h-[40px]" }} />
          <div {...{ className: "flex flex-col gap-2 items-start" }}>
            <span {...{ className: "font-mono text-sm font-bold" }}>
              {name}
            </span>
            <button
              {...{
                className:
                  "font-mono text-xs text-red-400 hover:text-red-600 cursor-pointer",
                onClick: () => setIsModalOpen(true),
              }}
            >
              {t("sideBar.logout")}
            </button>
          </div>
        </div>
      </div>
      <ScreenModal
        {...{
          isOpen: isModalOpen,
          onConfirm: handleSignOut,
          onCancel: () => setIsModalOpen(false),
          message: t("logOutModal.logOutMessage"),
          onCancelLabel: t("logOutModal.cancel"),
          onConfirmLabel: t("logOutModal.logOut"),
        }}
      />
    </>
  );
};
