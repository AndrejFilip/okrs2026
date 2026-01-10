import React from "react";
import { Login } from "./components/Login";

export default function page() {
  return (
    <div
      {...{ className: "w-full h-screen flex items-center justify-center " }}
    >
      <Login />
    </div>
  );
}
