import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full mx-auto max-w-7xl">
      <Header />

      <main className="flex flex-col py-8 items-start">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
