// COMPONENTE PARA MOSTRAR OS ZOMBIES

"use client";

import { ethers } from "ethers";

import ABI from "../ABI/abi.json";
import { useState, useEffect } from "react";
import BackButton from "@/app/components/BackButton";

const CryptoZombieAddress = "0xD5321a94ed8851f45f6cfB3cCC2768dD407e1AF1";

type MyZombiesProps = {
  accounts: string;
};

const MyZombies = ({ accounts }: MyZombiesProps) => {
  // const isConnected = Boolean(accounts);
  const [zombies, setZombies] = useState("");
  const [balance, setBalance] = useState(0);
  const [id, setId] = useState("");
  const [allZombies, setAllZombies] = useState([]);
  console.log(id);

  useEffect(() => {
    getQuantityZombies();
    getAllZombiesByOwner();
  }, []);

  // BUSCADOR DE BALANCE POR USUÁRIO
  const getQuantityZombies = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CryptoZombieAddress,
        ABI.abi,
        signer
      );

      const balance = await contract.balanceOf(
        "0xA5216C6F685c2b8a678A704107760Be652665234"
      );
      const balanceFormated = ethers.getNumber(balance);
      // console.log(balanceFormated);
      setBalance(balanceFormated);
    }
  };

  // BUSCADOR DE ZOMBIES PELO ID
  const getZombiesById = async (event: any) => {
    event.preventDefault();
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CryptoZombieAddress,
        ABI.abi,
        signer
      );

      const zombie = await contract.zombies(id);
      console.log(zombie);
      setZombies(zombie);
    }
  };

  // BUSCADOR DE ZOMBIES POR ENDEREÇO DE USUÁRIO
  const getAllZombiesByOwner = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CryptoZombieAddress,
        ABI.abi,
        signer
      );

      const allzombies = await contract.getZombieListByOwner(signer);
      console.log(allzombies);
      setAllZombies(allzombies);
    }
  };

  return (
    <div className="flex p-12 bg-zinc-500 h-screen">
      <div className="flex flex-col">
        <h1 className="text-3xl text-white uppercase tracking-wider font-medium">
          My Zombies : {balance}
        </h1>
        {/* BUSCADOR DE ZOMBIES PELO ID */}
        <div className="flex flex-col items-center bg-orange-400 w-96 h-full p-5 rounded-lg mt-5">
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex gap-2">
              <form onSubmit={getZombiesById}>
                <div className="flex gap-3">
                  <input
                    className="rounded-md p-2"
                    value={id}
                    type="number"
                    placeholder="Buscar Pelo ID"
                    onChange={(e) => setId(e.target.value)}
                  />
                  <button className="rounded-md bg-lime-600 p-2" type="submit">
                    Buscar
                  </button>
                </div>
              </form>
            </div>
            <div>
              <div className="flex flex-col gap-3 w-44 p-2 bg-red-300">
                <span>Name : {zombies[0]}</span>
                <span>Level : {zombies[2]?.toString()}</span>
                <span>Wins : {zombies[4]?.toString()}</span>
                <span>Loses : {zombies[5]?.toString()}</span>
              </div>
            </div>
          </div>
        </div>
        {/* BUSCADOR DE ZOMBIES PELO ENDEREÇO DE USUÁRIO */}
        <div className="flex gap-3 mt-3">
          {allZombies.map((myzombies: any) => {
            return (
              <div key={myzombies} className="">
                <ul className="flex flex-col gap-3 bg-red-300 p-3 rounded-md w-auto h-auto">
                  <li>Name : {myzombies.name}</li>
                  <li>Level : {myzombies.level.toString()}</li>
                  <li>Win Count : {myzombies.winCount.toString()}</li>
                  <li>Loss Count : {myzombies.lossCount.toString()}</li>
                </ul>
              </div>
            );
          })}
        </div>
        <div className="flex mt-3">
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default MyZombies;
