"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Trip } from "../../../../../lib/db/schema";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaMountain, FaFire } from "react-icons/fa";
import moment from "moment";
import { IoSpeedometerOutline } from "react-icons/io5";

interface LastTripsWidgetProps {
  trips: Trip[];
}

export const LastTripsWidget = ({ trips }: LastTripsWidgetProps) => {
  const { t } = useTranslation();

  const getTripIcon = (km: number) => {
    if (km < 30) {
      return (
        <IoIosCheckmarkCircle
          {...{ className: "relative w-12 h-12 text-red-500" }}
        />
      );
    } else if (km >= 30 && km < 100) {
      return (
        <IoIosCheckmarkCircle
          {...{ className: "relative w-12 h-12 text-yellow-500" }}
        />
      );
    } else {
      return (
        <IoIosCheckmarkCircle
          {...{ className: "relative w-12 h-12 text-green-500" }}
        />
      );
    }
  };

  return (
    <div
      {...{
        className: "w-full sm:w-1/2  bg-white",
      }}
    >
      <div
        {...{
          className: "bg-slate-800 p-5",
        }}
      >
        <span {...{ className: "font-bold text-xl text-white " }}>
          {t("dashboard.lastFiveTripsWidget.label")}
        </span>
      </div>

      <div {...{ className: "p-4 space-y-2" }}>
        {trips.map((trip) => (
          <div
            key={trip.id}
            {...{
              className:
                "flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-800 cursor-pointer group",
            }}
          >
            <div {...{ className: "flex justify-center sm:block" }}>
              {getTripIcon(trip.kilometers)}
            </div>

            <div {...{ className: "flex-1 flex flex-col gap-2" }}>
              <div
                {...{
                  className:
                    "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
                }}
              >
                <span
                  {...{
                    className:
                      "font-bold text-slate-800 group-hover:text-blue-600 text-center sm:text-left",
                  }}
                >
                  {trip.name}
                </span>
                <span
                  {...{
                    className:
                      "text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full self-center",
                  }}
                >
                  {moment(trip.date).format("DD.MM.YYYY")}
                </span>
              </div>

              <div
                {...{
                  className:
                    "flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-sm",
                }}
              >
                <div
                  {...{ className: "flex items-center gap-1.5 text-blue-600" }}
                >
                  <IoSpeedometerOutline {...{ className: "w-3.5 h-3.5" }} />
                  <span {...{ className: "font-semibold" }}>
                    {trip.kilometers} km
                  </span>
                </div>
                <div
                  {...{
                    className: "flex items-center gap-1.5 text-orange-600",
                  }}
                >
                  <FaMountain {...{ className: "w-3.5 h-3.5" }} />
                  <span {...{ className: "font-semibold" }}>
                    {trip.elevation} m
                  </span>
                </div>
                <div
                  {...{ className: "flex items-center gap-1.5 text-red-600" }}
                >
                  <FaFire {...{ className: "w-3.5 h-3.5" }} />
                  <span {...{ className: "font-semibold" }}>
                    {trip.calories} kcal
                  </span>
                </div>
                <div
                  {...{
                    className:
                      "flex items-center gap-1.5 text-slate-600 ml-auto",
                  }}
                >
                  <span {...{ className: "font-mono text-xs mr-2" }}>
                    {trip.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
