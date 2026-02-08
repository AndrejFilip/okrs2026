import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Trip } from "../../../../../lib/db/schema";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaMountainSun } from "react-icons/fa6";
import { ImPower } from "react-icons/im";
import { BsCalendar2Date } from "react-icons/bs";
import { FaBurn } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { TripStatCard } from "./TripStatCard";

interface LastTripOverviewProps {
  lastTrip: Trip | null;
}

export const LastTripOverview = memo(({ lastTrip }: LastTripOverviewProps) => {
  const { t } = useTranslation();

  if (!lastTrip) {
    return (
      <div
        {...{
          className: "bg-slate-800 rounded-2xl p-6 border border-white",
        }}
      >
        <span
          {...{
            className: "text-gray-400 font-mono text-center block text-lg",
          }}
        >
          {t("dashboard.emptyTrips")}
        </span>
      </div>
    );
  }

  return (
    <div
      {...{
        className:
          "bg-slate-800 flex flex-col p-6 rounded-2xl border border-white gap-4 w-full ",
      }}
    >
      <div {...{ className: "flex flex-col gap-2" }}>
        <span {...{ className: "text-white font-mono font-bold text-2xl" }}>
          {t("dashboard.lastTripOverviewlabel")}
        </span>
        <span {...{ className: "text-gray-300 font-mono text-sm" }}>
          {lastTrip.name || "Morning mountain bike ride"}
        </span>
      </div>

      <div {...{ className: "flex flex-col lg:flex-row gap-4" }}>
        <TripStatCard
          {...{
            icon: (
              <IoSpeedometerOutline
                {...{ className: "w-10 h-10 text-white" }}
              />
            ),
            label: t("dashboard.lastTrip.kilometers"),
            value: lastTrip.kilometers,
            unit: "KM",
            size: "large",
          }}
        />

        <div {...{ className: "flex flex-col gap-4 w-full lg:w-1/2" }}>
          <TripStatCard
            {...{
              icon: <FaMountainSun {...{ className: "w-8 h-8 text-white" }} />,
              label: t("dashboard.lastTrip.elevation"),
              value: lastTrip.elevation,
              unit: "m",
            }}
          />
          <TripStatCard
            {...{
              icon: <ImPower {...{ className: "w-8 h-8 text-white" }} />,
              label: t("dashboard.lastTrip.watts"),
              value: lastTrip.watts || 0,
              unit: "W",
            }}
          />
        </div>
      </div>

      <div {...{ className: "flex flex-col lg:flex-row gap-4" }}>
        <TripStatCard
          {...{
            icon: <BsCalendar2Date {...{ className: "w-8 h-8 text-white" }} />,
            label: t("dashboard.lastTrip.date"),
            value: new Date(lastTrip.date).toLocaleDateString("sk-SK"),
          }}
        />
        <TripStatCard
          {...{
            icon: <MdAccessTime {...{ className: "w-8 h-8 text-white" }} />,
            label: t("dashboard.lastTrip.duration"),
            value: lastTrip.time,
            unit: "hh:mm:ss",
          }}
        />
        <TripStatCard
          {...{
            icon: <FaBurn {...{ className: "w-8 h-8 text-white" }} />,
            label: t("dashboard.lastTrip.calories"),
            value: lastTrip.calories,
            unit: "kcal",
          }}
        />
      </div>
    </div>
  );
});
