import React, { useState, useEffect } from "react";
import "./DelegatesTable.css";
import { delegatesRefreshRate } from "../config/config.json";
import { Table } from "antd";
import { fetchDelegates } from "../services/lisk";
import starGreen from "../assets/starGreen.png";
import starRed from "../assets/starRed.png";

const columns = [
  {
    key: "username",
    title: "Username",
    dataIndex: "username",
    sorter: (a, b) => a.username < b.username,
  },
  {
    key: "address",
    title: "Address",
    dataIndex: "address",
    sorter: (a, b) => a.address < b.address,
    responsive: ["xl"],
  },
  {
    key: "lastForgedHeight",
    title: "Last Forged Height",
    dataIndex: "lastForgedHeight",
    sorter: (a, b) => a.lastForgedHeight - b.lastForgedHeight,
    responsive: ["xl"],
  },
  {
    key: "consecutiveMissedBlocks",
    title: "Consecutive Missed Blocks",
    dataIndex: "consecutiveMissedBlocks",
    sorter: (a, b) => a.consecutiveMissedBlocks - b.consecutiveMissedBlocks,
    responsive: ["xl"],
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "consecutiveMissedBlocks",
    sorter: (a, b) => a.consecutiveMissedBlocks - b.consecutiveMissedBlocks,
    render: (value) =>
      value > 0 ? (
        <img src={starRed} alt="status" />
      ) : (
        <img src={starGreen} alt="status" />
      ),
  },
  {
    key: "totalVotesReceived",
    title: "Total Votes Received",
    dataIndex: "totalVotesReceived",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.totalVotesReceived - b.totalVotesReceived,
    render: (value) => `${value.toLocaleString("en")} LSK`,
  },
];

const buildTableData = (delegates) =>
  delegates.map((data) => {
    const { address } = data;
    const {
      username,
      lastForgedHeight,
      consecutiveMissedBlocks,
      totalVotesReceived,
    } = data.dpos.delegate;

    return {
      key: username,
      username,
      lastForgedHeight,
      address,
      consecutiveMissedBlocks,
      totalVotesReceived: Number(totalVotesReceived / 100000000),
    };
  });

const DelegatesTable = () => {
  const [delegates, setDelegates] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(refreshDelegates, delegatesRefreshRate);
    refreshDelegates();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const refreshDelegates = async () => {
    const delegates = await fetchDelegates();
    setDelegates(delegates);
  };

  return (
    <Table
      bordered={false}
      columns={columns}
      dataSource={buildTableData(delegates)}
      size={"small"}
      pagination={{ pageSize: delegates.length, hideOnSinglePage: true }}
    />
  );
};

export default DelegatesTable;
