import React from "react";
import { SiteHeader } from "@/components/site-header";

const AdminHome = () => {
  return (
    <div>
      <SiteHeader title="Admin Home" />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Manage your application settings and data here.</p>
      </div>
    </div>
  );
};

export default AdminHome;
