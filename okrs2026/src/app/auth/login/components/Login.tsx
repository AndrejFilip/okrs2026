"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { IoBicycle } from "react-icons/io5";

export const Login = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div
        {...{
          className: "w-[500px] flex flex-row justify-between items-center",
        }}
      >
        <IoBicycle {...{ className: "w-[100px] h-[100px]" }} />
        <span {...{ className: "text-xs font-mono text-gray-400" }}>
          {t("loginPage.backToHome")}
        </span>
      </div>
    </div>
  );
};
