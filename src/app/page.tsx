"use client";

import CreateZombie from "@/app/components/CreateZombie";
import Navbar from "@/app/components/Navbar";
import React, { useState } from "react";

export default function Home() {
  const [accounts, setAccounts] = useState("");

  return (
    <main className="min-h-screen overflow-hidden bg-sky-950">
      <Navbar accounts={accounts} setAccounts={setAccounts} />
      <CreateZombie accounts={accounts} />
    </main>
  );
}