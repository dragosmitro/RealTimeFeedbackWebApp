import React from "react";
import LogoutVector from "./LogoutVector";

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <React.Fragment>
      <button onClick={handleLogout}>
        <LogoutVector />
      </button>
    </React.Fragment>
  );
}
