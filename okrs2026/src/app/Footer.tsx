/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaFacebookF, FaLinkedin } from "react-icons/fa";
import logo from "../../pictures/logo.png";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <div
      {...{
        className: "w-full bg-slate-800 text-white p-4 text-center mt-1",
      }}
    >
      <div
        {...{
          className:
            "flex flex-row justify-between items-center gap-2 md:ml-20 border-b border-gray-600 pb-4 md:mr-20",
        }}
      >
        <div {...{ className: "flex flex-row gap-2 font-mono lg:text-2xl " }}>
          <span>{t("footer.help")}</span>
          <Link
            {...{
              className: "cursor-pointer text-orange-500 underline",
              href: "mailto:example@example.com",
            }}
          >
            {t("footer.contactUs")}
          </Link>
        </div>
        <div {...{ className: "flex flex-row gap-4" }}>
          <Link {...{ href: "https://www.facebook.com" }}>
            <FaFacebookF
              {...{ className: "w-[30px] h-[30px] cursor-pointer" }}
            />
          </Link>
          <Link {...{ href: "https://www.instagram.com" }}>
            <FaInstagram
              {...{ className: "w-[30px] h-[30px] cursor-pointer" }}
            />
          </Link>
          <Link {...{ href: "https://www.linkedin.com" }}>
            <FaLinkedin
              {...{ className: "w-[30px] h-[30px] cursor-pointer" }}
            />
          </Link>
        </div>
      </div>
      <div
        {...{
          className: "flex flex-row justify-between items-center",
        }}
      >
        <div {...{ className: "flex flex-row gap-2 md:ml-20 items-center" }}>
          <img
            {...{
              src: logo.src,
              alt: "logo",
              className: "mt-4 w-[150px]",
            }}
          />
          <span {...{ className: "font-mono lg:text-4xl" }}>
            {t("footer.fronTest")}
          </span>
        </div>
        <div {...{ className: "md:mr-20 mt-4" }}>
          <span {...{ className: "font-mono text-xs" }}>
            {t("footer.allRightsReserver", { date: new Date().getFullYear() })}
          </span>
        </div>
      </div>
    </div>
  );
};
