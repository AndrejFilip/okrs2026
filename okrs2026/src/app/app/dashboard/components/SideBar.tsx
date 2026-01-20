"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { IoBicycle } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { SideBarMenuItem } from "./SideBarMenuItem";
import { FaRoad } from "react-icons/fa";
import { RiCommunityLine } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { Session } from "next-auth";
import { LogOut } from "./LogOut";
import { usePathname } from "next/navigation";

export const SideBar = ({ session }: { session: Session | null }) => {
  const { t } = useTranslation();
  const userName = session?.user.name || "User";
  const pathname = usePathname();

  return (
    <div {...{ className: "h-full flex flex-col justify-between" }}>
      <div
        {...{
          className: "flex gap-5 items-center justify-center lg:justify-start",
        }}
      >
        <IoBicycle
          {...{ className: "w-[40px] h-[40px] text-white font-bold" }}
        />
        <span
          {...{
            className:
              "hidden lg:block text-white text-2xl font-mono font-bold",
          }}
        >
          {t("sideBar.home")}
        </span>
      </div>
      <nav>
        <ul {...{ className: "flex flex-col gap-2" }}>
          <SideBarMenuItem
            {...{
              name: t("sideBar.dashboard"),
              icon: (
                <MdDashboard
                  {...{ className: "w-[24px] h-[24px] text-white" }}
                />
              ),
              href: "/app/dashboard",
              isActive: pathname === "/app/dashboard",
            }}
          />
          <SideBarMenuItem
            {...{
              name: t("sideBar.trips"),
              icon: (
                <FaRoad {...{ className: "w-[24px] h-[24px] text-white" }} />
              ),
              href: "/app/trips",
              isActive: pathname === "/app/trips",
            }}
          />
          <SideBarMenuItem
            {...{
              name: t("sideBar.community"),
              icon: (
                <RiCommunityLine
                  {...{ className: "w-[24px] h-[24px] text-white" }}
                />
              ),
              href: "/app/community",
              isActive: pathname === "/app/community",
            }}
          />
          <SideBarMenuItem
            {...{
              name: t("sideBar.settings"),
              icon: (
                <IoIosSettings
                  {...{ className: "w-[24px] h-[24px] text-white" }}
                />
              ),
              href: "/app/settings",
              isActive: pathname === "/app/settings",
            }}
          />
        </ul>
      </nav>
      <LogOut {...{ name: userName }} />
    </div>
  );
};
