"use client"
import Slider from "react-slick";
import team_data from "@/data/TeamData"
import Image from "next/image"
import Link from "next/link"

const settings ={
   dots: false,
	infinite: true,
	speed: 1000,
    centerMode: true,
    centerPadding: '130px',
	autoplay: false,
	arrows: false,
	slidesToShow: 6,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				infinite: true,
                centerPadding: '70px',
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1,
				infinite: true,
                centerPadding: '40px',
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
                centerPadding: '0',
                centerMode: false,
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
                centerPadding: '0',
                centerMode: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
                centerPadding: '0',
                centerMode: false,
			}
		},
	]
}

const Team = () => {
   return (
      <section className="team-area team-bg" style={{ backgroundImage: `url(/assets/img/bg/team_bg.png)` }}>
         <div className="container-fluid p-0">
            <div className="row">
               <div className="col-lg-12">
                  <div className="banner-content text-center">
                     <h2 className="title">Empower Your Voice:<br />Join Our DAO</h2>
					 <p>Beyond just trading strategies, become a part of our decentralized autonomous organization (DAO),<br /> where your voice directly influences the future of our platform. It&apos;s not just about navigating the market; <br />it&apos;s about shaping the ecosystem in which we trade. Here, your vote counts,<br /> and your ideas can steer the course of our collective journey.</p>
                  </div>
               </div>
            </div>
            <div className="team-item-wrap">
               {/*<Slider {...settings} className="row team-active g-0">
                  {team_data.map((item) => (
                     <div key={item.id} className="col">
                        <div className="team-item">
                           <div className="team-thumb">
                              <Image src={item.img} alt="" />
                              <Link href="#" className="team-social"><i className="fab fa-linkedin-in"></i></Link>
                           </div>
                           <div className="team-content">
                              <h2 className="title">{item.title}</h2>
                              <span>{item.profession}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </Slider>*/}
               <div className="read-more-btn text-center mt-70">
                  <Link href="/register" className="btn">Purchase a Token</Link>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Team
