import React, { useState } from "react";
import { useWallet } from "./hooks/useWallet";
import WalletInfo from "./components/WalletInfo";
import ExternalBalanceDisplay from "./components/DisplayExternalBalance";

const App = () => {
  const { connectWallet, account, balance, network, fetchBalance } =
    useWallet();
  const [address, setAddress] = useState("");
  const [externalBalance, setExternalBalance] = useState("");
  const [showBalance, setShowBalance] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address) {
      const balance = await fetchBalance(address, true);
      setExternalBalance(balance);
      setShowBalance(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Wallet Connection</h1>
      {account ? (
        <WalletInfo account={account} balance={balance} network={network} />
      ) : (
        <button
          onClick={connectWallet}
          className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200"
        >
          Connect Wallet
        </button>
      )}

      <form onSubmit={handleSubmit} className="mt-8">
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-2 border border-white bg-black text-white rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200"
        >
          Get Balance
        </button>
      </form>

      <div className="mt-5">
        {showBalance && (
          <ExternalBalanceDisplay
            account={address}
            balance={externalBalance}
            chainId={network}
          />
        )}
      </div>
    </div>
  );
};

export default App;
