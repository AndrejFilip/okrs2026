/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const Sellers = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const sellers = [
    {
      name: "MTBIKER",
      url: "https://www.mtbiker.sk",
      logoUrl:
        "https://pbcdn1.podbean.com/imglogo/image-logo/12146227/logo-mtbiker-2020-cierne_nvixa5.jpg",
      pictureUrl:
        "https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-storefront/default/dwead92c71/category-landing/mountain/seo-mtb-light.jpg?sw=632&sh=356&sm=cut&sfrm=jpg&q=80",
      text: t("landingPage.MTBIKERDescription"),
    },
    {
      name: "Cykloshop",
      url: "https://www.cykloshop.sk",
      logoUrl:
        "https://cdn.myshoptet.com/usr/www.cykloshop.sk/user/logos/logo.png",
      pictureUrl:
        "https://cdn.myshoptet.com/usr/www.cykloshop.sk/user/shop/big/21779-8_magene-c506-gps-dotykovy-cyklopocitac.jpg?6745bcd0",
      text: t("landingPage.cykloshopDescription"),
    },
    {
      name: "Canyon",
      url: "https://www.canyon.com",
      logoUrl:
        "https://www.logo.wine/a/logo/Canyon_Bicycles/Canyon_Bicycles-Logo.wine.svg",
      pictureUrl:
        "https://dma.canyon.com/image/upload/w_750,c_fit/b_rgb:F2F2F2/f_auto/q_auto/v1740411129/2025_FULL_exceed_cf-8_3988_M160_P03_de93r4",
      text: t("landingPage.canyonDescription"),
    },
  ];

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % sellers.length);
  };

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + sellers.length) % sellers.length);
  };

  return (
    <motion.div
      {...{
        className:
          "bg-white flex flex-col gap-4 justify-center items-center mt-4 relative",
        initial: { x: -300 },
        animate: { x: 0 },
        transition: { duration: 2 },
      }}
    >
      <h2 {...{ className: "text-2xl font-mono text-center mt-4" }}>
        {t("landingPage.ourSellers")}
      </h2>

      <motion.div
        key={index}
        {...{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1 },
        }}
      >
        <div
          {...{ className: "flex flex-row gap-4 justify-center items-center" }}
        >
          <img
            {...{
              src: sellers[index].logoUrl,
              alt: sellers[index].name,
              className:
                "w-[120px] h-[120px] object-contain lg:w-[200px] lg:h-[200px]",
            }}
          />
          <img
            {...{
              src: sellers[index].pictureUrl,
              alt: sellers[index].name,
              className:
                "w-[120px] h-[120px] rounded-full object-cover lg:w-[200px] lg:h-[200px]",
            }}
          />
        </div>
        <p {...{ className: "text-center font-mono w-auto lg:w-[600px]" }}>
          {sellers[index].text}
        </p>
      </motion.div>
      <Link
        {...{
          href: sellers[index].url,
          className:
            "text-center font-mono bg-slate-800 hover:bg-slate-700 text-white w-[120px] py-2 rounded-md",
        }}
      >
        {t("landingPage.zistiViac")}
      </Link>
      {index < sellers.length - 1 ? (
        <button
          {...{
            className:
              "mt-2 md:mt-0 md:absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-800 hover:bg-slate-700 text-white w-[40px] h-[40px] rounded-md cursor-pointer",
            onClick: handleNext,
          }}
        >
          {">"}
        </button>
      ) : null}
      {index > 0 ? (
        <button
          {...{
            className:
              "mt-2 md:mt-0 md:absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-800 hover:bg-slate-700 text-white w-[40px] h-[40px] rounded-md cursor-pointer",
            onClick: handlePrevious,
          }}
        >
          {"<"}
        </button>
      ) : null}
    </motion.div>
  );
};
