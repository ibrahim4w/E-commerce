// import React from 'react'

import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="pt-[76px] overflow-hidden">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
