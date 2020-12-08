import React, { useState, useEffect } from "react";
import "./Statistics.css";
import { statsRefreshRate } from "../config/config.json";
import { fetchForgerStats, fetchNodeInfo } from "../services/lisk";

const Statistics = () => {
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
    <div>
      <table className="statsTable">
        <tbody>
          <tr>
            <td>Height: {nodeInfo?.height || "N/A"} </td>
            <td className="textAlignRight">
              Next Forgers:{" "}
              {forgers.map(
                (forger, i) => `${forger.username}${i !== forgers.length - 1 ? ", " : ""}`
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Statistics;
