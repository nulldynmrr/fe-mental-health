import Visualize from "@/components/visualize/card";
import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import React from "react";

const Visualisation = () => {
  return (
   <>
      <Navbar />

      <div className="p-6 md:px-20 md:py-12">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Visualization" },
          ]}
        />

        <div className="mt-6">
          <Visualize/>
        </div>
      </div>
    </>
  );
};

export default Visualisation;
