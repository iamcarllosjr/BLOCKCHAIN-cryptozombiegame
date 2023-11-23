"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();

  return (
    <button className="bg-emerald-600 p-3 rounded-md text-xl text-white" onClick={() => router.back()}>Voltar</button>
  )
}

export default BackButton;