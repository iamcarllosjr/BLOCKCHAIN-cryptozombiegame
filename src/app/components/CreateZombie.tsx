"use client";
// import { useState } from "react";
import { ethers } from "ethers";

import ABI from "../ABI/abi.json";
const CryptoZombieAddress = "0xD5321a94ed8851f45f6cfB3cCC2768dD407e1AF1";

type MintProps = {
  accounts: string;
};

const CryptoZombie = ({ accounts }: MintProps) => {
  //Caso queira mintar um zombie com algum nome
  // const [name, setName] = useState("");
  const isConnected = Boolean(accounts);
  // console.log(name);

  const handleMint = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const createZombie = new ethers.Contract(
          CryptoZombieAddress,
          ABI.abi,
          signer
        );

        const mintTxn = await createZombie.createRandomZombie(signer);

        await mintTxn.wait();
        const minted = mintTxn.hash;
        console.log(`NFT mintado, confira o hash ${minted}`);

        console.log("mined ", mintTxn.hash);
        console.log("nft minted!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-3">
      {isConnected ? (
        <div className="flex flex-col gap-5">
        <h1 className="text-3xl text-white">Mint seu CryptoZombie Agora</h1>

        {/* <input
          className="bg-zinc-500 text-white p-2"
          type="text"
          placeholder="Digite o nome do seu Zumbi"
          onChange={(e) => setName(e.target.value)}
        /> */}

        <button
          className="mt-3 cursor-pointer rounded-md bg-[#D6517D] p-4 text-white"
          onClick={handleMint}
        >
          Mint Now
        </button>

        
      </div>
      ) : <p className="mx-4 mt-[70px] flex items-center justify-center text-center font-[25px] tracking-wider text-[#D6517D]">
      You must be connected to mint
    </p>}
    </div>
  );
};

export default CryptoZombie;
