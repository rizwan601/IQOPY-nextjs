import Image, { StaticImageData } from "next/image"

import featuresImg_1 from "@/assets/img/images/features_two_img01.png";
import featuresImg_2 from "@/assets/img/images/features_two_img02.png";
import featuresImg_3 from "@/assets/img/images/features_two_img03.png";

import featuresTitleImg_1 from "@/assets/img/images/title_img01.jpg";
import featuresTitleImg_2 from "@/assets/img/images/title_img02.jpg";

import featuresShape_1 from "@/assets/img/images/features_shape01.png";
import featuresShape_2 from "@/assets/img/images/features_shape02.png";

import Link from "next/link"


interface DataType {
   id: number;
   title: string;
   img: StaticImageData;
   description: string[];
}

const feature_data: DataType[] = [
   {
      id: 1,
      title: "Transparent",
      img: featuresImg_1,
      description: [
         "Gain confidence: Verify the performance of strategy providers through transparent and reliable reports.",
         "Reduce risk: Make informed investment decisions by accessing verified data on strategy providers&apos; track records.",
         "Ensure trust: Build trust in your investments with certified reports that offer transparency and accountability."
      ]
   },
   {
      id: 2,
      title: "Balanced",
      img: featuresImg_2,
      description: [
         "Maximize returns: Utilize an advanced optimization formula to enhance trading strategies and increase profitability.",
         "Minimize risk: Mitigate potential losses by leveraging cutting-edge algorithms that optimize trading performance.",
         "Stay competitive: Stay ahead of the market with innovative optimization techniques that adapt to changing market conditions."
      ]
   },
   {
      id: 3,
      title: "Optimized",
      img: featuresImg_3,
      description: [
         "Streamline trading: Seamlessly execute trades across multiple exchanges from a single platform, saving time and effort.",
         "Expand opportunities: Access a wider range of trading opportunities by integrating with multiple exchanges, maximizing your investment potential.",
         "Enhance efficiency: Enjoy a smoother trading experience with seamless integration that eliminates the need to switch between different exchange platforms."
      ]
   }
]


const FeatureTwo = () => {
   return (
      <section className="features-area-two features-bg" style={{ backgroundImage: `url(/assets/img/bg/features_bg.png)` }}>
         <div className="container">
            <div className="features-inner-wrap">
               <div className="features-item-wrap">
                  <div className="row justify-content-center">
                     {feature_data.map((item) => (
                        <div key={item.id} className="col-lg-4 col-md-6">
                           <div className="features-item-two">
                              <div className="features-img-two">
                                 <Image src={item.img} alt="" />
                              </div>
                              <div className="features-content-two">
                                 <h2 className="title">{item.title}</h2>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="row">
                  <div className="col-lg-12">
                     <div className="banner-content text-center">
                        <h2 className="title">Enter a Transparent Trading Era:<br /> <span>Your Strategy, Your Success.</span></h2>
                        <p>Dive into a trading experience where clarity reigns supreme. Our platform transforms trading from<br /> a risky bet to a strategic journey. With blockchain-verified strategies and the wisdom of hedge fund algorithms,<br /> your portfolio is not just diverse but dynamic. Break free from exchange barriers, choosing from <br />the best strategies globally. Here, success is not by chance, but a result of informed decisions<br /> and strategic freedom. Welcome to streamlined trading, where your success is optimized,<br /> and your strategy sets you apart.</p>
                        </div>
                     <div className="read-more-btn text-center mt-70">
                     <Link href="/register" className="btn">Purchase a Token</Link>
                  </div>
                  </div>
               </div>
               <div className="features-line-shape"></div>
            </div>
         </div>
         <div className="features-shape-wrap">
            <Image src={featuresShape_1} alt="" className="alltuchtopdown" />
            <Image src={featuresShape_2} alt="" className="leftToRight" />
         </div>
      </section>
   )
}

export default FeatureTwo
