import "antd/dist/antd.css";
import "./App.css";
import Header from "./components/Header";
import DelegatesTable from "./components/DelegatesTable";
import Statistics from "./components/Statistics";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";
import { statsRefreshRate } from "./config/config.json";
import { fetchForgerStats, fetchNodeInfo } from "./services/lisk";

const App = () => {
  const [forgers, setForgers] = useState([]);
  const [nodeInfo, setNodeInfo] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(refreshStats, statsRefreshRate);
    refreshStats();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const refreshStats = async () => {
    const forgerStats = await fetchForgerStats();
    const nodeInfo = await fetchNodeInfo();

    setForgers(forgerStats.slice(0, 3));
    setNodeInfo(nodeInfo);
  };

  return (
    <div className="App">
      <div className="container">
        <Header nodeInfo={nodeInfo} />
        <Statistics forgers={forgers} nodeInfo={nodeInfo} />
        <DelegatesTable />
        <Footer />
      </div>
    </div>
  );
};

export default App;
