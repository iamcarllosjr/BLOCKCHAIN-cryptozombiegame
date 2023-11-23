import Link from "next/link";
import { useEffect } from "react";

type AccountsProps = {
  accounts: string;
  setAccounts: any;
};

const Navbar = ({ accounts, setAccounts }: AccountsProps) => {
  const isConnected = Boolean(accounts);
  // console.log(accounts);

  useEffect(() => {
    getCurrentWallet();
    addWalletListener();
  });

  //function for connect Wallet
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* Metamask is Installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      /* Metamask is not installed */
      console.log("Please install Metamask");
    }
  };

  //function to keep the same account when reloading the page
  const getCurrentWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setAccounts(accounts[0]);
        } else {
          console.log("Connect to Metamask using the Connect Button ");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  //Function so that when disconnecting from the wallet, change the state of the button on the page
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts: any[]) => {
        setAccounts(accounts[0]);
      });
    } else {
      /* Metamask is not installed */
      setAccounts("");
      console.log("Please connect to wallet address");
    }
  };

  return (
    <div className="bg-tranparent sticky top-0 z-50 h-20 w-full justify-between px-4 lg:h-[12vh]">
      

        
        <div className="flex items-center justify-between">
          {isConnected ? (
            <div className="flex justify-between gap-7">
              <div className="flex items-center gap-7">
          <ul className="flex gap-7 tracking-wider text-white">
            <Link href="/battle">
              Battles
            </Link>
            <Link href="/myzombies">
              My Zombies
            </Link>
          </ul>
        </div>

              <p className="tracking-wider text-white">Connected</p>
            </div>
          ) : (
            <button className="btn" onClick={connectWallet}>
              Connect
            </button>
          )}
        </div>
      
    </div>
  );
};

export default Navbar;