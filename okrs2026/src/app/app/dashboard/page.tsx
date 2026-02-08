import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { StatsItems } from "./components/StatsItems";
import { getStats } from "../../../../lib/actions/stats";
import { getLastTrip, getTrips } from "../../../../lib/actions/trips";
import { LastTripsWidget } from "./components/LastTripsWidget";
import { WattsWidgets } from "../WattsWidgets";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const userId = Number(session?.user.id);

  console.log(userId);
  const stats = await getStats(userId);
  const lastTrip = (await getLastTrip(userId)) ?? null;
  const trips = await getTrips({ userId, limit: 5, page: 1 });
  const watts = trips.trips.map((trip) => trip.watts);

  return (
    <div
      {...{ className: "max-w-[min(70vw,1400px)] mx-auto flex gap-4 flex-col" }}
    >
      <StatsItems
        {...{
          kilometers: stats.kilometers ?? 0,
          elevation: stats.elevation ?? 0,
          calories: stats.calories ?? 0,
          lastTrip,
        }}
      />

      <div {...{ className: "flex flex-col lg:flex-row gap-4 items-start" }}>
        {trips.trips.length > 0 ? (
          <LastTripsWidget {...{ trips: trips.trips }} />
        ) : null}

        <WattsWidgets {...{ watts }} />
      </div>
    </div>
  );
}
