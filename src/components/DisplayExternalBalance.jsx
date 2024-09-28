import React from "react";

const ExternalBalanceDisplay = ({ account, balance, chainId }) => {
  const formatAddress = (address) => {
    return `${address.slice(2, 5)}...${address.slice(-4)}`;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-lg bg-white text-black">
      <h2 className="text-lg font-semibold mb-2">Wallet Balance</h2>
      <p className="text-gray-700">
        <span title={`${account}`} className="font-bold">
          0x{formatAddress(account)}{" "}
        </span>
        has <span className="font-bold">{balance}</span> ether on the{" "}
        <span className="font-bold">{chainId}</span> network.
      </p>
    </div>
  );
};

export default ExternalBalanceDisplay;
