import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { StatsItems } from "./components/StatsItems";
import { getStats } from "../../../../lib/actions/stats";
import { getLastTrip } from "../../../../lib/actions/trips";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const userId = Number(session?.user.id);

  console.log(userId);
  const stats = await getStats(userId);
  const lastTrip = (await getLastTrip(userId)) ?? null;

  return (
    <div {...{ className: "max-w-[min(70vw,1400px)] mx-auto" }}>
      <StatsItems
        {...{
          kilometers: stats.kilometers ?? 0,
          elevation: stats.elevation ?? 0,
          calories: stats.calories ?? 0,
          lastTrip,
        }}
      />
    </div>
  );
}
