import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <NavBar />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
