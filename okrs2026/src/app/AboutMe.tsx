/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import next from "../../pictures/next.svg";
import postman from "../../pictures/postman.svg";
import cypress from "../../pictures/cypress.svg";
import playwright from "../../pictures/playwright.svg";
import react from "../../pictures/react.png";
import tailwind from "../../pictures/tailwind.png";
import me from "../../pictures/me.jpg";

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

  const images = [next, postman, cypress, playwright, react, tailwind];

  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const text = t(descriptions[currentIndex]);

      if (!isDeleting && charIndex <= text.length) {
        setDisplayText(text.substring(0, charIndex));
        charIndex++;
        timeoutId = setTimeout(type, 100);
      } else if (!isDeleting) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          type();
        }, 1500);
      } else if (charIndex > 0) {
        charIndex--;
        setDisplayText(text.substring(0, charIndex));
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
              src: me.src,
              alt: "Description",
              className: "w-[400px] h-auto rounded-full hidden md:block",
            }}
          />
        </div>
      </div>
      <div {...{ className: "overflow-hidden w-full mt-10" }}>
        <motion.div
          {...{
            className: "flex gap-20 items-center p-4 whitespace-nowrap",
            initial: { x: 0 },
            animate: { x: "-50%" },
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              repeatType: "reverse",
            },
          }}
        >
          {[...images, ...images].map((image, index) => (
            <img
              key={index}
              {...{
                src: image.src,
                alt: "logos",
                className: "h-[70px] w-auto",
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
