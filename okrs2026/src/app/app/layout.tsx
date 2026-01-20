import { auth } from "../../../auth";
import { SideBar } from "./dashboard/components/SideBar";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div
      {...{
        className: "w-full min-h-screen flex",
      }}
    >
      <div {...{ className: "w-[80px] lg:w-[280px] bg-slate-800 p-3 lg:p-5" }}>
        <SideBar {...{ session }} />
      </div>
      <div {...{ className: "flex-1" }}>{children}</div>
    </div>
  );
}
