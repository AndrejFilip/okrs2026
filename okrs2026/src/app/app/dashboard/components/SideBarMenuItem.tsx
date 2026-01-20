"use client";

import Link from "next/link";
import React from "react";

interface SideBarMenuItemProps {
  name: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
}

export const SideBarMenuItem = ({
  name,
  icon,
  href,
  isActive = false,
}: SideBarMenuItemProps) => {
  return (
    <Link {...{ href }}>
      <li
        {...{
          className: `flex items-center justify-center lg:justify-start gap-2 p-3 rounded-md ${
            isActive ? "bg-slate-500" : "hover:bg-slate-500"
          } cursor-pointer`,
        }}
      >
        {icon}
        <span
          {...{ className: "hidden lg:block text-white text-lg font-mono" }}
        >
          {name}
        </span>
      </li>
    </Link>
  );
};
