"use client"
import Image from "next/image"
// import CountdownClock from "@/ui/CountDownClock";

import bannerShape_1 from "@/assets/img/banner/banner_shape01.png";
import bannerShape_2 from "@/assets/img/banner/banner_shape02.png";
// import CommonButton from "@/components/CommonButton";
import PresaleTabs from "@/components/Presale/PresaleTabs";
// import { useWeb3Modal } from "@web3modal/wagmi/react";
let mode = false
const Banner = () => {
   // const { open } = useWeb3Modal();
   return (
      <section className="banner-area banner-bg" style={{ backgroundImage: `url(/assets/img/banner/banner_bg.png)` }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-10">
                  <div className="banner-content text-center">
                     {/* <CommonButton onClick={() =>
                    open()}>
                     ConnectWallet
                     </CommonButton> */}
                     <PresaleTabs mode={mode}/>
                     {/* <h2 className="title">Embark on a Journey of <br /> <span>Transparency in Copy Trading</span></h2>
                     <p>The world of telegram strategy providers is a maze, filled with hidden losses and shadowed gains. Like you, we&apos;ve felt the frustration of following paths that lead to nowhere but disappointment. That&apos;s where iQopy changes everything. By meticulously verifying each strategy provider&apos;s history and making it transparent and immutable on the blockchain, we clear the fog of uncertainty. With us, you navigate through this maze with a clear vision.</p>
                     <div className="banner-countdown-wrap">
                        <div className="coming-time" data-countdown="2024/4/16">
                        <CountdownClock />
                        </div>
                     </div> */}
                  </div>
               </div>
            </div>
         </div>
         <div className="banner-scroll-down">
               <a href="#contribution" className="section-link">
                  <span></span>
                  <span></span>
                  <span></span>
               </a>
         </div>
         <div className="banner-shape-wrap">
            <Image src={bannerShape_1} alt="" className="leftToRight" />
            <Image src={bannerShape_2} alt="" className="alltuchtopdown" />
         </div>
      </section>
   )
}

export default Banner
