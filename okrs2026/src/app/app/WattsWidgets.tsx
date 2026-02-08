"use client";
import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WattsWidgetsProps {
  watts: number[];
}
export const WattsWidgets = ({ watts }: WattsWidgetsProps) => {
  const data = watts.map((watts, index) => ({
    trip: index + 1,
    watts: watts,
  }));

  return (
    <div
      {...{
        className:
          "w-full sm:w-1/2 bg-white p-4 rounded-lg shadow flex flex-col",
      }}
    >
      <h3 {...{ className: "text-lg font-semibold mb-4" }}>Watts per Trip</h3>
      <ResponsiveContainer {...{ width: "100%", height: 400 }}>
        <LineChart {...{ data }}>
          <CartesianGrid {...{ strokeDasharray: "3 3" }} />
          <XAxis
            {...{
              dataKey: "trip",
              label: { value: "Trip", position: "insideBottom", offset: -5 },
            }}
          />
          <YAxis
            {...{
              label: { value: "Watts", angle: -90, position: "insideLeft" },
            }}
          />
          <Tooltip />
          <Line
            {...{
              type: "monotone",
              dataKey: "watts",
              stroke: "#a9223f",
              activeDot: { r: 8 },
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
