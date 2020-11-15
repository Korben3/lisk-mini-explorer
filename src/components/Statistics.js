import React, { useState, useEffect } from "react";
import "./Statistics.css";
import { APIClient } from "@liskhq/lisk-api-client";
import { nodes, statsRefreshRate } from "../config/config.json";

const Statistics = () => {
  const [statsTable, setStatsTable] = useState([]);

  useEffect(() => {
    setInterval(refreshStats, statsRefreshRate);
    refreshStats();
  }, []);

  const refreshStats = () => {
    // retrieve and display blockchain statistics
    const client = new APIClient(nodes);
    client.delegates
      .getForgers({
        limit: 3,
      })
      .then((res) => {
        const stats = (
          <tr>
            <td> Height: {res.meta.lastBlock} </td>{" "}
            <td className="textAlignRight">
              {" "}
              Next Forgers: {res.data[0].username}, {res.data[1].username},{" "}
              {res.data[2].username}
            </td>
          </tr>
        );
        setStatsTable(stats);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <table className="statsTable">
        <tbody>{statsTable}</tbody>
      </table>
    </div>
  );
};
export default Statistics;
