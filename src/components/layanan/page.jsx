import React from "react";
import Heads from "./heads";
import MenuCards from "./card";
import AboutBox from "./about";

const Services = () => {
    return (
       <div className="flex flex-col items-center justify-center gap-20 px-25 py-15">
        <Heads/>
        <MenuCards/>

        <AboutBox/>
       </div>
    );
};

export default Services;