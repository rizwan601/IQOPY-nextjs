import Image, { StaticImageData } from "next/image"
import Link from "next/link";

import featureImg_1 from "@/assets/img/images/features_img01.png";
import featureImg_2 from "@/assets/img/images/features_img02.png";
import featureImg_3 from "@/assets/img/images/features_img03.png";
import featureImg_4 from "@/assets/img/images/features_img04.png";
import Airdrop from "@/components/Airdrop/Airdrop";

interface DataType {
   id: number;
   title: JSX.Element;
   desc: JSX.Element;
   img: StaticImageData;
}
const feature_data: DataType[] = [
   {
      id: 1,
      title: (<>Trust Through Transparency</>),
      desc: (<> Imagine a world where every trade, every strategy is laid bare. We make this a reality by verifying every strategy provider&apos;s history directly through their exchange accounts, ensuring what you see is the truth, carved in blockchain.</>),
      img: featureImg_1,
   },
   {
      id: 2,
      title: (<>Your Portfolio, Redefined</>),
      desc: (<>Gone are the days of putting all your eggs in one basket. With us, diversify your strategy like a pro. Our platform doesn&apos;t just allow you to choose; it helps you choose wisely, adjusting dynamically for the best outcome.</>),
      img: featureImg_2,
   },
   {
      id: 3,
      title: (<>The Wisdom of Hedge Funds</>),
      desc: (<>Tap into sophisticated optimization algorithms, a luxury once reserved for the elite. We recalibrate your investments post every trade, striving to safeguard your assets while pushing for peak performance.</>),
      img: featureImg_3,
   },
   {
      id: 4,
      title: (<>Freedom Across Exchanges</>),
      desc: (<>Unlock the full potential of the trading world. With our seamless API integration, you&apos;re no longer restricted to a single exchange. Now, you can access and implement leading strategies from across the market spectrum</>),
      img: featureImg_4
   },
]
 let mode= false;
const FeatureOne = () => {
   return (
      <>
      <Airdrop  mode={mode}/>
      <section  className="features-area pt-140 pb-110">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-10">
                  <div className="section-title text-center mb-70">
                     <h2 className="title">Welcome to iQopy, your compass in the stormy seas of trading.</h2>
                  </div>
               </div>
            </div>
            <div className="row">
               {feature_data.map((item) => (
                  <div key={item.id} className="col-lg-6">
                     <div className="features-item">
                        <div className="features-content">
                           <h2 className="title"><Link href="#!">{item.title}</Link></h2>
                           <p>{item.desc}</p>
                        </div>
                        <div className="features-img">
                           <Image src={item.img} alt="" />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
      </>
   )
}

export default FeatureOne
