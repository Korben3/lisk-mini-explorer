import React, { useState, useEffect } from "react";
import "./DelegatesTable.css";
import DelegatesRow from "./DelegatesRow.js";
import { APIClient } from "@liskhq/lisk-api-client";
import { nodes, delegatesRefreshRate } from "../config/config.json";

// import liskLogo from "../assets/liskLogo-small.png";

const DelegatesTable = () => {
  const [delegatesRows, setDelegatesRows] = useState([]);

  useEffect(() => {
    //  start timer
    setInterval(refreshDelegates, delegatesRefreshRate);
    refreshDelegates();
  }, []);

  const refreshDelegates = () => {
    // retrieve all 103 delegates and display in mainTable
    const client = new APIClient(nodes);

    client.delegates
      .get({
        limit: 103,
        sort: "totalVotesReceived:desc",
      })
      .then((res) => {
        const delegatesRows = res.data.map((data) => (
          <DelegatesRow
            username={data.username}
            address={data.address}
            producedBlocks={data.producedBlocks}
            missedBlocks={data.missedBlocks}
            consecutiveMissedBlocks={data.delegate.consecutiveMissedBlocks}
            productivity={data.productivity}
            totalVotesReceived={data.totalVotesReceived / 100000000}
          />
        ));
        setDelegatesRows(delegatesRows);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <table className="mainTable">
        <thead>
          <tr key="tableHead">
            <th>Username</th>
            <th className="mobileOff">Address</th>
            <th className="mobileOff">Produced Blocks</th>
            <th className="mobileOff">Missed Blocks</th>
            <th>Status</th>
            <th>Productivity</th>
            <th className="mobileOff">Total Votes Received</th>
          </tr>
        </thead>
        <tbody>{delegatesRows}</tbody>
      </table>
    </div>
  );
};
export default DelegatesTable;
