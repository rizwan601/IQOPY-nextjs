"use client"
import Slider from "react-slick";

interface DataTyfe {
   id: number;
   roadmap_title: string;
   title: string;
   desc: JSX.Element;
}

const roadmap_data: DataTyfe[] = [
   {
      id: 1,
      roadmap_title: "End of Q3 2022",
      title: "Project Initiation",
      desc: (<>Kickstart the project development phase, laying down the foundational elements necessary for the platform&apos;s operation. This includes setting up infrastructure, establishing development environments, assembling the core team, and initiating strategic planning to drive the project forward.</>),
   },
   {
      id: 2,
      roadmap_title: "End of Q1 2023",
      title: "Algo Development",
      desc: (<>Dive into the development of sophisticated algorithms aimed at optimizing strategy provider&apos;s funds allocation. This phase involves extensive research, prototyping, testing, and fine-tuning to ensure that the algorithms effectively utilize the investor&apos;s funds, balance risk, and maximize performance.</>),
   },
   {
      id: 3,
      roadmap_title: "End of Q4 2023",
      title: "Testing Phase",
      desc: (<>Enter the rigorous testing phase to validate the functionality, reliability, and security of the platform. Comprehensive testing scenarios are conducted to identify and address any potential issues or bugs. This phase also involves gathering feedback from early users to refine features.</>),
   },
   {
      id: 4,
      roadmap_title: "End of Q1 2024",
      title: "Beta Version",
      desc: (<>Roll out the beta version to a select group of users for real-world testing and feedback. This phase allows users to explore the platform&apos;s features, provide valuable insights, and report any issues encountered. The feedback collected during this stage is instrumental in fine-tuning the platform.</>),
   },
   {
      id: 5,
      roadmap_title: "End of Q2 2024",
      title: "Full Launch & ICO",
      desc: (<>Mark the official launch of the platform to the public, accompanied by an Initial Coin Offering (ICO) to facilitate token distribution and raise funds for further development. The platform is made available to a global audience, offering users access to its full suite of features and functionalities.</>),
   },
   {
      id: 6,
      roadmap_title: "End of Q3 2024",
      title: "AI Assistant",
      desc: (<> Integrate an AI-powered assistant into the platform to provide users with personalized recommendations, real-time insights, and proactive support. Leverage cutting-edge artificial intelligence technology to enhance user experience, streamline decision-making processes, and optimize trading strategies.</>),
   },
   {
      id: 7,
      roadmap_title: "End of Q4 2024",
      title: "Mobile App",
      desc: (<> Embark on the development of a mobile application to provide users with convenient access to the platform&apos;s features and functionalities on their smartphones and tablets. The mobile application will offer a seamless and user-friendly interface, allowing users to monitor their accounts.</>),
   },
]

const settings = {
   dots: false,
   infinite: true,
   speed: 1000,
   centerMode: true,
   centerPadding: '260px',
   autoplay: true,
   arrows: false,
   slidesToShow: 3,
   slidesToScroll: 1,
   responsive: [
      {
         breakpoint: 1400,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            centerPadding: '100px',
         }
      },
      {
         breakpoint: 1200,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            centerPadding: '40px',
         }
      },
      {
         breakpoint: 992,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            enterPadding: '0',
            centerMode: false,
         }
      },
      {
         breakpoint: 767,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            enterPadding: '0',
            centerMode: false,
         }
      },
      {
         breakpoint: 575,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            enterPadding: '0',
            centerMode: false,
         }
      },
   ]
}

const RoadMapArea = () => {
   return (
      <section id="roadMap" className="roadmap-area pt-140">
         <div className="container-fluid p-0">
            <div className="row g-0">
               <div className="col-lg-12">
                  <div className="section-title text-center mb-70">
                     <h2 className="title">Our Roadmap</h2>
                  </div>
               </div>
            </div>
            <Slider {...settings} className="row roadMap-active">
               {roadmap_data.map((item) => (
                  <div key={item.id} className="col-lg-4">
                     <div className="roadmap-item">
                        <span className="roadmap-title">{item.roadmap_title}</span>
                        <div className="roadmap-content">
                           <h4 className="title"><span className="dot"></span>{item.title}</h4>
                           <p>{item.desc}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </Slider>
         </div>
      </section>
   )
}

export default RoadMapArea
