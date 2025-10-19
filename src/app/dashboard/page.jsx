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
    
      <div>
      <UpperHero />
      </div>
      
      <div id="layanan"> 
      <Services />
      </div>
      
      <div>
      <VideoSection />
      </div>

      <div>
      <NewsSection />
      </div>

      <div id="hubungi-kami">
      <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
