/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sellers } from "./Sellers";

export default function Home() {
  const { t } = useTranslation();
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = t("rovnica");

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 75);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
      if (index >= fullText.length) {
        setShowCursor(false);
      }
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [fullText]);

  return (
    <div {...{ className: "max-w-[min(80vw,1400px)] mx-auto" }}>
      <div
        {...{
          className: "w-full flex justify-center items-center flex-col gap-2",
        }}
      >
        <img
          {...{
            src: "https://images.pexels.com/photos/1619299/pexels-photo-1619299.jpeg",
            alt: "mountain biking",
            className:
              "rounded-xl max-h-[400px] w-full object-cover max-w-[min(70vw,1400px)]",
          }}
        />
        <p {...{ className: "text-sm lg:text-lg font-mono text-center" }}>
          {displayedText}
          <span
            className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}
          >
            |
          </span>
        </p>
      </div>
      <Sellers />
    </div>
  );
}
