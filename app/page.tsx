"use client"
import { ethers } from "ethers";
import Image from "next/image";
import { useState } from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Home() {

    // State variables for wallet connection status and address
    const [connected, setConnected] = useState<boolean>(false);
    const [walletAddress, setWalletAddress] = useState("");
  
    // Function to connect/disconnect the wallet
    async function connectWallet() {
      const provider = new ethers.BrowserProvider(window.ethereum);
      if (!connected) {
        // Connect the wallet using ethers.js
  
        const signer = await provider.getSigner();
        const _walletAddress = await signer.getAddress();
        setConnected(true);
        setWalletAddress(_walletAddress);
      } else {
        // Disconnect the wallet
        await provider.send("eth_requestAccounts", []);
        setConnected(false);
        setWalletAddress("");
      }
    }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
   
       

      <div className="space-y-4">
          <button className="btn" onClick={connectWallet}>
            {connected ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
          <h1>Address</h1>
          <h4>{walletAddress}</h4>
        </div>
      </main>
   
    </div>
  );
}


