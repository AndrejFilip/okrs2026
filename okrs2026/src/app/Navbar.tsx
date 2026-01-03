/* eslint-disable @next/next/no-img-element */

"use client";

import { useTranslation } from "react-i18next";
import "./i18n";
import Link from "next/link";
import { IoBicycle } from "react-icons/io5";

export const Navbar = () => {
  const pictureUrls = [
    "https://cdn.suwalls.com/wallpapers/photography/bicycle-in-the-sunset-22832-1920x1080.jpg",
  ];
  const { t } = useTranslation();

  return (
    <div {...{ className: "w-full flex flex-col items-center gap-2" }}>
      <div
        {...{
          className:
            "flex flex-row gap-8 justify-center items-center font-mono text-lg",
        }}
      >
        <IoBicycle {...{ className: "w-[50px] h-[50px]" }} />
        <Link
          {...{
            href: "https://www.mtbiker.sk",
            className: "hover:underline hover:font-bold",
          }}
        >
          {t("mtbiker")}
        </Link>
        <Link
          {...{
            href: "https://www.cykloshop.sk",
            className: "hover:underline hover:font-bold",
          }}
        >
          {t("cykloshop")}
        </Link>
        <Link
          {...{
            href: "https://www.canyon.com",
            className: "hover:underline hover:font-bold",
          }}
        >
          {t("canyon")}
        </Link>

        <Link
          {...{
            href: "/login",
            className:
              "bg-slate-800 text-white w-[150px] rounded-md hover:bg-slate-600 p-2 text-center",
          }}
        >
          {t("login")}
        </Link>
      </div>
      <img
        {...{
          src: pictureUrls[0],
          alt: "mountain biking",
          className:
            "rounded-xl max-h-[400px] w-full object-cover max-w-[min(70vw,1400px)]",
        }}
      />
    </div>
  );
};
