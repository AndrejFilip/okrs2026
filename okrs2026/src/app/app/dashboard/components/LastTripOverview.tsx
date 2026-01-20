import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Trip } from "../../../../../lib/db/schema";

interface LastTripOverviewProps {
  lastTrip: Trip | null;
}

export const LastTripOverview = memo(({ lastTrip }: LastTripOverviewProps) => {
  const { t } = useTranslation();

  return (
    <div
      {...{
        className: "flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md",
      }}
    >
      <span
        {...{
          className:
            "font-mono text-xl font-bold text-slate-800 items-center justify-center flex",
        }}
      >
        {lastTrip
          ? t("dashboard.lastTripOverviewlabel")
          : t("dashboard.emptyTrips")}
      </span>
      <div {...{ className: "flex gap-2" }}>{lastTrip?.time}</div>
    </div>
  );
});
