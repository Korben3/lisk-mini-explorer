import React, { useState, useEffect } from "react";
import "./DelegatesTable.css";
import DelegatesRow from "./DelegatesRow.js";
import { delegatesRefreshRate } from "../config/config.json";
import { fetchDelegates } from "../services/lisk";

const DelegatesTable = () => {
  const [delegates, setDelegates] = useState([]);

  useEffect(() => {
    //  start timer
    const intervalId = setInterval(refreshDelegates, delegatesRefreshRate);
    refreshDelegates();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // retrieve all 103 delegates and update state
  const refreshDelegates = async () => {
    const delegates = await fetchDelegates();
    setDelegates(delegates);
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
        <tbody>
          {delegates.map(delegate => (
            <DelegatesRow {...delegate} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DelegatesTable;
