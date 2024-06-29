import Banner from "./Banner";
import Brand from "./Brand";
import ChartArea from "./ChartArea";
import Contribution from "./Contribution";
import DownloadArea from "./DownloadArea";
import FAQ from "./Faq";
import FeatureOne from "./FeatureOne";
import FeatureTwo from "./FeatureTwo";
import RoadMapArea from "./RoadMapArea";
import Team from "./Team";

const Home = () => {
   return (
      <>
         <Banner />
         <Contribution />
         <Brand />
         <FeatureOne />
         <FeatureTwo />
         <ChartArea />
         <RoadMapArea />
         <Team />
         <FAQ />
         <DownloadArea />
      </>
   )
}

export default Home;
