import React, { memo } from "react";

interface TripStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  size?: "large" | "small";
}

export const TripStatCard = memo(
  ({ icon, label, value, unit, size = "small" }: TripStatCardProps) => {
    const isLarge = size === "large";

    return (
      <div
        {...{
          className: `flex flex-row items-center ${isLarge ? "gap-6 p-6" : "gap-4 p-3"} flex-1 border border-white rounded-lg`,
        }}
      >
        <div {...{ className: isLarge ? "w-14 h-14" : "w-10 h-10" }}>
          {icon}
        </div>
        <div {...{ className: "flex flex-col" }}>
          <span
            {...{
              className: `text-gray-400 font-mono font-bold ${isLarge ? "text-base" : "text-sm"}`,
            }}
          >
            {label}
          </span>
          <div {...{ className: "flex items-baseline gap-2" }}>
            <span
              {...{
                className: `text-white font-mono font-bold ${isLarge ? "text-5xl" : "text-xl"}`,
              }}
            >
              {value}
            </span>
            {unit && (
              <span
                {...{
                  className: `text-gray-400 font-mono font-bold ${isLarge ? "text-2xl" : "text-base"}`,
                }}
              >
                {unit}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
);
