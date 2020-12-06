import React from "react";
import starGreen from "../assets/starGreen.png";
import starRed from "../assets/starRed.png";

const DelegatesRow = ({
  username,
  address,
  producedBlocks,
  missedBlocks,
  consecutiveMissedBlocks,
  productivity,
  totalVotesReceived,
}) => {
  return (
    <tr key={username}>
      <td>{username}</td>
      <td className="mobileOff">{address}</td>
      <td className="mobileOff">{producedBlocks}</td>
      <td className="mobileOff">{missedBlocks}</td>
      <td>
        {consecutiveMissedBlocks > 0 ? (
          <img src={starRed} alt="status" />
        ) : (
          <img src={starGreen} alt="status" />
        )}
      </td>
      <td>{productivity}%</td>
      <td className="mobileOff">{totalVotesReceived.toLocaleString("en")} LSK</td>
    </tr>
  );
};
export default DelegatesRow;
