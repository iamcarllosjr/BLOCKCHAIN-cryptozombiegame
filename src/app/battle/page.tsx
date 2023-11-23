"use client";
import { useState } from "react";
import { ethers } from "ethers";

import ABI from "../ABI/abi.json";
import BackButton from "@/app/components/BackButton";
const CryptoZombieAddress = "0xD5321a94ed8851f45f6cfB3cCC2768dD407e1AF1";

const ZombieBattle = () => {
  const [idAttacker, setIdAttacker] = useState("");
  const [idEnemy, setIdEnemy] = useState("");

  const handleAttack = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const zombiebattle = new ethers.Contract(
          CryptoZombieAddress,
          ABI.abi,
          signer
        );

        const initialBattle = await zombiebattle.attack(idAttacker, idEnemy);

        await initialBattle.wait();
        console.log("Ataque realizado");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-sky-950 w-full h-screen">
      <div className="flex flex-col items-center justify-center">
        <form className="flex gap-5 mt-10">
          <input
            className="text-zinc-500 w-16 text-center text-lg font-semibold p-3"
            type="text"
            onChange={(e) => setIdAttacker(e.target.value)}
          />
          <input
            className="text-zinc-500 w-16 text-center text-lg font-semibold p-3"
            type="text"
            onChange={(e) => setIdEnemy(e.target.value)}
          />
        </form>

        <button className="flex mt-5 bg-red-700 p-3 rounded-lg uppercase text-2xl" onClick={handleAttack}>Attack</button>

        <BackButton />
      </div>
    </div>
  );
};

export default ZombieBattle;
