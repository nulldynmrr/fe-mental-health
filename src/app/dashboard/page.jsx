import Navbar from "@/components/navbar/page";
import UpperHero from "@/components/upperHero/page";
import Services from "@/components/layanan/page";
import VideoSection from "@/components/video/page";

const Dashboard = () => {
    return (

        <div>
        <Navbar />
        <UpperHero/>
        <Services/>
        <VideoSection/>
        </div>

    );


};

export default Dashboard;