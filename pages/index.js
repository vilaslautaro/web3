import { useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { connector } from "../config/web3";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { active, activate, deactivate, account, error, chainId } = useWeb3React();

    const connect = useCallback(() => {
      activate(connector);
      localStorage.setItem("previouslyConnected", true);
    }, [activate]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);



  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };



  return (
    <div className={styles.container}>
      <h1>Web3 demo app</h1>
      {active ? (
        <>
          <button onClick={() => disconnect()}>Disconnnect Wallet</button>
          <p>You are connected to {chainId} network</p>
          <p>Your account is: {account}</p>
        </>
      ) : (
        <button onClick={() => connect()}>Connnect Wallet</button>
      )}
    </div>
  );
}
