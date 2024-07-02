"use client"
import Image, { StaticImageData } from "next/image"
import Slider from "react-slick";

import binance from "@/assets/img/brand/binance.jpg"
import bybit from "@/assets/img/brand/bybit.jpg"
import coinbase from "@/assets/img/brand/coinbase.jpg"
import kraken from "@/assets/img/brand/kraken.jpg"
import kucoin from "@/assets/img/brand/kucoin.jpg"
import gate from "@/assets/img/brand/gate.jpg"
import blockchaincom from "@/assets/img/brand/blockchaincom.jpeg"

const brand_data: StaticImageData[] = [gate, bybit, coinbase, binance, kucoin, kraken, blockchaincom];

const settings = {
   dots: false,
	infinite: true,
	speed: 1000,
	autoplay: true,
	arrows: false,
	slidesToShow: 7,
	slidesToScroll: 2,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
}

const Brand = () => {
   return (
      <div  className="brand-area">
         <div className="container-fluid p-0">
            <div className="row g-0">
               <div className="col-lg-12">
                  <div className="brand-title text-center">
                     <h6 className="title">Fully Integrated Exchanges</h6>
                  </div>
               </div>
            </div>
            <div className="brand-item-wrap">
               <Slider {...settings} className="row g-0 brand-active">
                  {brand_data.map((item, i) => (
                     <div key={i} className="col-12">
                        <div className="brand-item">
                           <Image src={item} alt="" />
                        </div>
                     </div>
                  ))}
               </Slider>
            </div>
         </div>
      </div>
   )
}

export default Brand
