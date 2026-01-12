import { auth } from "../../../../auth";

export default async function DashboardPage() {
  const session = await auth(); // Assuming you have a getSession function to fetch user session
  return (
    <div>
      <h1>{session?.user?.email}</h1>
    </div>
  );
}
