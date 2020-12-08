import React from "react";
import "./Header.css";

const Header = ({ nodeInfo }) => {
  return (
    <div>
      <p className="Header">
        Lisk Mini Explorer - Betanet <sup>(Lisk Core {nodeInfo?.version || "3.0.0-beta2"})</sup>
      </p>
    </div>
  );
};
export default Header;
