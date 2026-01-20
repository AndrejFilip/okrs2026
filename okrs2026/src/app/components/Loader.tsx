import React from "react";
import { useTranslation } from "react-i18next";
import { LuLoaderCircle } from "react-icons/lu";

export const Loader = () => {
  const { t } = useTranslation();
  return (
    <div
      {...{
        className:
          "w-full flex flex-col justify-center items-center gap-4 animate-rotate",
      }}
    >
      <LuLoaderCircle {...{ className: "w-[50px] h-[50px] animate-spin" }} />
      <span {...{ className: "font-mono text-slate-800 font-bold text-md" }}>
        {t("loginPage.loading")}
      </span>
    </div>
  );
};
