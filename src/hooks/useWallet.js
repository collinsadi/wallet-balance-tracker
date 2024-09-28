import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { chainNames } from "../utils/chainName";

export const useWallet = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);

  const convertHexWeiToEther = (hexWei) => {
    const weiValue = ethers.toBigInt(hexWei);

    const etherValue = ethers.formatEther(weiValue);

    return parseFloat(etherValue).toFixed(4);
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("No Ethereum provider found. Install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      const account = accounts[0];
      console.log(account);
      setAccount(account);
      await fetchBalance(account, false);
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      console.log(parseInt(chainId, 16));
      setNetwork(chainNames[parseInt(chainId, 16)]); //checked chainlist code and this was how it was encoded to hex
      // setNetwork(chainId);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const fetchBalance = async (account, isExternal) => {
    if (!window.ethereum) {
      console.log("No Ethereum provider found.");
      return;
    }

    console.log("Fetching balance for account:", account);

    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });

      // so i tried this and i thought it was not working
      // after  researching w, i found out
      // it returns the balance in hexadecimal and you need to convert it to an easy to read figure
      // hexwei => weiValue => etherValue => fixedDecimal

      console.log("Raw balance (in Wei):", balance);

      // Convert from hex to decimal
      // const balanceInEth = parseFloat(balance) / 1e18;
      const balanceInEth = convertHexWeiToEther(balance);

      console.log("Balance in ETH:", balanceInEth);

      if (isExternal) {
        return balanceInEth;
      } else {
        setBalance(balanceInEth);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log(account);
      setAccount(account);
      fetchBalance(account);
    } else {
      setAccount(null);
      setBalance(null);
    }
  };

  const handleChainChanged = async (chainId) => {
    setNetwork(chainNames[parseInt(chainId, 16)]);
    console.log(chainId);
    if (account) {
      console.log("Running");
      fetchBalance(account);
    }
  };

  return { connectWallet, account, balance, network, fetchBalance };
};
