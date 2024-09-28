import React from "react";

const generateAvatar = () => {
  const avatars = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=4",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=6",
    "https://i.pravatar.cc/150?img=7",
    "https://i.pravatar.cc/150?img=8",
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
};

const WalletInfo = ({ account, balance, network }) => {
  const avatarUrl = generateAvatar();

  return (
    <div className="flex flex-col items-center mt-6 p-6 border border-gray-300 rounded-lg shadow-lg bg-white text-black">
      <img
        src={avatarUrl}
        alt="Random Avatar"
        className="mb-4 w-24 h-24 rounded-full border-4 border-gray-700"
      />
      <p className="text-2xl font-semibold mb-2">
        <strong>Account:</strong>{" "}
        {account
          ? `0x${account.slice(2, 7)}...${account.slice(-4)}`
          : "Not Connected"}
      </p>
      <p className="text-2xl font-semibold mb-2">
        <strong>Balance:</strong> {balance ? balance : "0.00"} ETH
      </p>
      <p className="text-2xl font-semibold mb-2">
        <strong>Network:</strong> {network || "Unknown"}
      </p>
      {/* <div className="flex justify-center mt-4">
        <button className="px-4 py-2 font-semibold text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-300">
          Refresh
        </button>
      </div> */}
    </div>
  );
};

export default WalletInfo;
