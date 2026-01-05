/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export const AboutMe = () => {
  const descriptions = useMemo(
    () => [
      "aboutMe.smallDescription_first",
      "aboutMe.smallDescription_second",
      "aboutMe.smallDescription_third",
    ],
    []
  );
  const { t } = useTranslation();
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showSmejo, setShowSmejo] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const text = t(descriptions[currentIndex]);

      if (!isDeleting && charIndex <= text.length) {
        setDisplayText(text.slice(0, charIndex++));
        timeoutId = setTimeout(type, 100);
      } else if (!isDeleting) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          type();
        }, 1500);
      } else if (charIndex > 0) {
        setDisplayText(text.slice(0, --charIndex));
        timeoutId = setTimeout(type, 50);
      } else {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % descriptions.length;
        timeoutId = setTimeout(type, 500);
      }
    };

    type();

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearInterval(cursorInterval);
    };
  }, [descriptions, t]);

  const handleScroll = () => {
    const element = document.getElementById("aboutMeDetailed");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToBike = () => {
    const element = document.getElementById("findingInfo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div {...{ className: "flex flex-col gap-1 mt-4" }}>
        <span
          {...{ className: "md:text-lg text-slate-800 font-mono font-bold" }}
        >
          {t("aboutMe.hello")}
        </span>
        <div {...{ className: "flex flex-row gap-2" }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={showSmejo ? "smejo" : "andrej"}
              {...{
                animate: { y: 0, opacity: 1 },
                exit: { y: -10, opacity: 0 },
                transition: { duration: 0.3 },
                className:
                  "md:text-4xl text-orange-500 font-mono font-bold cursor-pointer inline-block",
                onClick: () => setShowSmejo(!showSmejo),
              }}
            >
              {showSmejo ? t("aboutMe.smejo") : t("aboutMe.andrej")}
            </motion.span>
          </AnimatePresence>
          {"  "}
          <span
            {...{ className: "md:text-4xl text-slate-800 font-mono font-bold" }}
          >
            {t("aboutMe.bielik")}
          </span>
        </div>
        <span
          {...{ className: "md:text-5xl text-gray-400 font-mono font-bold" }}
        >
          {displayText}
          <span
            {...{
              className: `${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`,
            }}
          >
            |
          </span>
        </span>
        <span
          {...{
            className: "text-sm text-slate-800 font-mono lg:w-[700px]",
          }}
        >
          {t("aboutMe.description_first")}
        </span>
        <div {...{ className: "flex gap-2" }}>
          <button
            {...{
              className:
                " border hover:bg-slate-800 hover:text-white cursor-pointer text-slate-800 rounded-md w-[200px] p-2 font-bold font-mono mt-2",
              onClick: handleScroll,
            }}
          >
            {t("aboutMe.knowMore")}
          </button>
          <button
            {...{
              className:
                " border hover:bg-slate-800 hover:text-white cursor-pointer text-slate-800 rounded-md w-[230px] p-2 font-bold font-mono mt-2",
              onClick: handleScrollToBike,
            }}
          >
            {t("aboutMe.knowMoreAboutBikes")}
          </button>
        </div>
      </div>
      <div
        {...{
          className: "mt-50 flex flex-row justify-between w-full items-center",
        }}
      >
        <div
          {...{
            className:
              " flex flex-col gap-4 font-mono lg:w-[700px] text-slate-800",
          }}
        >
          <span
            {...{
              className: "text-5xl",
              id: "aboutMeDetailed",
            }}
          >
            {t("aboutMe.myNameIs")}
          </span>
          <span
            {...{
              className: "text-sm",
            }}
          >
            {t("aboutMe.description_second")}
          </span>
          <span
            {...{
              className: "text-sm",
            }}
          >
            {t("aboutMe.description_second")}
          </span>
          <span
            {...{
              className: "text-sm",
            }}
          >
            {t("aboutMe.description_third")}
          </span>
          <span
            {...{
              className: "text-sm text-slate-800 font-mono lg:w-[700px]",
            }}
          >
            {t("aboutMe.description_fourth")}
          </span>
        </div>
        <div>
          <img
            {...{
              src: "https://scontent.fbts7-1.fna.fbcdn.net/v/t39.30808-1/216424219_4788888187794952_2334296943765657119_n.jpg?stp=c336.0.1341.1341a_dst-jpg_s480x480_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_ohc=6VMulkuHbPIQ7kNvwGG4o0T&_nc_oc=Adl0pb6D-rfl9QoWwnNkjHTfeC-MgZUBWr3sp2N43K_sS6ZyXFj43oCubO0Heh5dnMk7YwDsJL4tOsSQkhqrf_VI&_nc_zt=24&_nc_ht=scontent.fbts7-1.fna&_nc_gid=azbuSOLFhxSCOnpzVjGNdQ&oh=00_AfpoRzlysVjAFLuLBTm53PCoEZrr6bJUAu3UktplrmE7kQ&oe=69609293",
              alt: "Description",
              className: "w-[400px] rounded-full  hidden md:block",
            }}
          />
        </div>
      </div>
    </div>
  );
};
