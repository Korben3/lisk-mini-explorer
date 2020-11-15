import React from "react";
import starGreen from "../assets/starGreen.png";
import starRed from "../assets/starRed.png";

const DelegatesRow = (props) => {
  return (
    <tr key={props.username}>
      <td>{props.username}</td>
      <td className="mobileOff">{props.address}</td>
      <td className="mobileOff">{props.producedBlocks}</td>
      <td className="mobileOff">{props.missedBlocks}</td>
      <td>
        {props.consecutiveMissedBlocks > 0 ? (
          <img src={starRed} alt="status" />
        ) : (
          <img src={starGreen} alt="status" />
        )}
      </td>
      <td>{props.productivity}%</td>
      <td className="mobileOff">
        {props.totalVotesReceived.toLocaleString("en")} LSK
      </td>
    </tr>
  );
};
export default DelegatesRow;
