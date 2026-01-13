"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { IoBicycle } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";

export const Navbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        {...{
          className:
            "hidden sm:flex flex-row gap-8 justify-center items-center font-mono text-lg w-full bg-white  p-4 shadow-md",
        }}
      >
        <Link {...{ href: "/" }}>
          <IoBicycle {...{ className: "w-[50px] h-[50px] cursor-pointer" }} />
        </Link>
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
            href: "/signup",
            className:
              "border border-slate-800 w-[200px] rounded-md hover:bg-slate-800 hover:text-white p-2 text-center",
          }}
        >
          {t("signup")}
        </Link>
        <Link
          {...{
            href: "/auth/login",
            className:
              "bg-slate-800 text-white w-[150px] rounded-md hover:bg-slate-600 p-2 text-center",
          }}
        >
          {t("login")}
        </Link>
      </div>
      <div {...{ className: "flex justify-end mr-4" }}>
        {open ? (
          <RxCross1
            {...{
              className: "sm:hidden w-[30px] h-[30px] cursor-pointer relative",
              onClick: () => setOpen(!open),
            }}
          />
        ) : (
          <RxHamburgerMenu
            {...{
              className: "sm:hidden w-[30px] h-[30px] cursor-pointer relative",
              onClick: () => setOpen(!open),
            }}
          />
        )}
        {open ? (
          <motion.ul
            {...{
              className:
                "absolute top-[60px] right-4 bg-white shadow-md rounded-md p-2 min-w-[200px] sm:hidden font-mono ",
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.3 },
            }}
          >
            <li
              {...{
                className: "py-2 px-4 hover:bg-gray-100 rounded",
              }}
            >
              <Link {...{ href: "https://www.mtbiker.sk", className: "block" }}>
                {t("mtbiker")}
              </Link>
            </li>

            <li {...{ className: "py-2 px-4 hover:bg-gray-100 rounded" }}>
              <Link
                {...{ href: "https://www.cykloshop.sk", className: "block" }}
              >
                {t("cykloshop")}
              </Link>
            </li>
            <li {...{ className: "py-2 px-4 hover:bg-gray-100 rounded" }}>
              <Link {...{ href: "https://www.canyon.com", className: "block" }}>
                {t("canyon")}
              </Link>
            </li>
            <li {...{ className: "py-2 px-4" }}>
              <Link
                {...{
                  href: "/signup",
                  className:
                    "block border border-slate-800 text-slate rounded px-4 py-2 text-center hover:bg-slate-800 hover:text-white",
                }}
              >
                {t("signup")}
              </Link>
            </li>
            <li {...{ className: "py-2 px-4" }}>
              <Link
                {...{
                  href: "/auth/login",
                  className:
                    "block bg-slate-800 text-white rounded px-4 py-2 text-center hover:bg-slate-600",
                }}
              >
                {t("login")}
              </Link>
            </li>
          </motion.ul>
        ) : null}
      </div>
    </div>
  );
};
