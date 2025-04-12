import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <>
    <div className="flex flex-col  w-full mx-auto container  ">
      <Header />
    </div>

      <main className="flex flex-col rounded-lg  ">
        <Outlet />
      </main>
<div className="flex flex-col w-full border-t round-lg ">

      <Footer />
</div>
    </>
  );
};

export default Layout;
