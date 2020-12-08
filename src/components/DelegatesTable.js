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
    key: "producedBlocks",
    title: "Produced Blocks",
    dataIndex: "producedBlocks",
    sorter: (a, b) => a.producedBlocks - b.producedBlocks,
    responsive: ["xl"],
  },
  {
    key: "missedBlocks",
    title: "Missed Blocks",
    dataIndex: "missedBlocks",
    sorter: (a, b) => a.missedBlocks - b.missedBlocks,
    responsive: ["xl"],
  },
  {
    key: "consecutiveMissedBlocks",
    title: "Consecutive Missed Blocks",
    dataIndex: "consecutiveMissedBlocks",
    sorter: (a, b) => a.consecutiveMissedBlocks - b.consecutiveMissedBlocks,
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "consecutiveMissedBlocks",
    render: value =>
      value > 0 ? <img src={starRed} alt="status" /> : <img src={starGreen} alt="status" />,
  },
  {
    key: "productivity",
    title: "Productivity",
    dataIndex: "productivity",
    sorter: (a, b) => a.productivity - b.productivity,
    render: value => `${value}%`,
  },
  {
    key: "totalVotesReceived",
    title: "Total Votes Received",
    dataIndex: "totalVotesReceived",
    sorter: (a, b) => a.totalVotesReceived - b.totalVotesReceived,
    render: value => `${value.toLocaleString("en")} LSK`,
    responsive: ["xl"],
  },
];

const buildTableData = delegates =>
  delegates.map(data => {
    const { username, totalVotesReceived } = data;
    const { consecutiveMissedBlocks } = data.delegate;

    return {
      ...data,
      key: username,
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
