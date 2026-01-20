"use client";

import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { StatItem } from "./StatItem";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiCellSignalHighBold } from "react-icons/pi";
import { FaBurn } from "react-icons/fa";
import { LastTripOverview } from "./LastTripOverview";
import { Trip } from "../../../../../lib/db/schema";

interface StatsItemsProps {
  kilometers: number;
  elevation: number;
  calories: number;
  lastTrip: Trip | null;
}

export const StatsItems = memo(
  ({ kilometers, elevation, calories, lastTrip }: StatsItemsProps) => {
    const { t } = useTranslation();
    return (
      <div {...{ className: "flex flex-col gap-4 mt-5" }}>
        <span {...{ className: "font-mono text-3xl font-bold text-slate-800" }}>
          {t("dashboard.label")}
        </span>
        <div
          {...{
            className:
              "flex flex-col lg:flex-row gap-5 justify-between items-center",
          }}
        >
          <StatItem
            {...{
              title: t("dashboard.kilometers"),
              value: kilometers,
              unit: "km",
              icon: <IoSpeedometerOutline {...{ className: "w-10 h-10" }} />,
            }}
          />

          <StatItem
            {...{
              title: t("dashboard.elevation"),
              value: elevation,
              unit: "m",
              icon: <PiCellSignalHighBold {...{ className: "w-10 h-10" }} />,
            }}
          />

          <StatItem
            {...{
              title: t("dashboard.totalCalories"),
              value: calories,
              unit: "kcal",
              icon: <FaBurn {...{ className: "w-10 h-10" }} />,
            }}
          />
        </div>
        <LastTripOverview {...{ lastTrip }} />
      </div>
    );
  },
);
