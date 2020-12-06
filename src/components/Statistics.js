import React, { useState, useEffect } from "react";
import "./Statistics.css";
import { statsRefreshRate } from "../config/config.json";
import { fetchForgerStats } from "../services/lisk";

const Statistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(refreshStats, statsRefreshRate);
    refreshStats();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // retrieve and display blockchain statistics
  const refreshStats = async () => {
    const stats = await fetchForgerStats();
    setStats(stats);
  };

  if (!stats) {
    return null;
  }

  const height = stats.meta.lastBlock;
  const forgers = stats.data;

  return (
    <div>
      <table className="statsTable">
        <tbody>
          <tr>
            <td>Height: {height} </td>
            <td className="textAlignRight">
              Next Forgers:{forgers.map(forger => ` ${forger.username}`)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Statistics;
