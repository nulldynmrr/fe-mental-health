import Navbar from "@/components/navbar/page";
import UpperHero from "@/components/upperHero/page";
import Services from "@/components/layanan/page";
import VideoSection from "@/components/video/page";
import NewsSection from "@/components/berita/page";
import Footer from "@/components/footer/page";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <UpperHero />
      <Services />
      <VideoSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Dashboard;
