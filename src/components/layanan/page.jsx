import React from "react";
import Heads from "./heads";
import MenuCards from "./card";

const Services = () => {
    return (
       <div className="flex flex-col items-center justify-center gap-20 px-25 py-20">
        <Heads/>
        <MenuCards/>
       </div>
    );
};

export default Services;