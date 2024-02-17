"use client";

import { useState } from "react";
import Menu from "./menu";

export default function Navbar() {
  const [display, setDisplay] = useState("none");
  const [shadow, setShadow] = useState("");

  const handleClick = () => {
    if (display === "none") {
      setShadow("0 0 4px black");
      setDisplay("flex");
    } else {
      setShadow("");
      setDisplay("none");
    }
  };

  return (
    <>
      <div id="navbar" style={{ boxShadow: shadow }}>
        <button className="navbar_icon" id="navbar_btn" onClick={handleClick}></button>
        <div id="navbar_menu" style={{ display: display }}>
          <Menu />
        </div>
      </div>
    </>
  );
}
