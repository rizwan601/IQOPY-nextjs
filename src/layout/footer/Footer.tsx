"use client"
import Image from "next/image";
import Link from "next/link";

import footerShape_1 from "@/assets/img/images/footer_shape01.png";
import footerShape_2 from "@/assets/img/images/footer_shape02.png";
import NewsletterForm from "@/components/forms/NewsletterForm";

interface DataType {
   id: number;
   class_name: string;
   title: string;
   footer_link: {
      link: string;
      link_title: string;
   }[]
}

const footer_data: DataType[] = [
   {
      id: 1,
      class_name: "col-xl-3 col-lg-3 col-md-4 col-sm-6",
      title: "Menu",
      footer_link: [{ link: "/", link_title: "Home" }, { link: "/#feature", link_title: "Feature" }, { link: "/#chart", link_title: "Ico Chart" }, { link: "/#roadMap", link_title: "RoadMap" },]
   },
   {
      id: 2,
      class_name: "col-xl-3 col-lg-2 col-md-4 col-sm-6",
      title: "Documents",
      footer_link: [{ link: "/contact", link_title: "Whitepaper" }, { link: "/contact", link_title: "Lightpaper" }, { link: "/contact", link_title: "Token Sale Terms" }, { link: "/contact", link_title: "Presentation" },]
   },
   {
      id: 3,
      class_name: "col-xl-3 col-lg-3 col-md-4 col-sm-4",
      title: "Usefull Links",
      footer_link: [{ link: "/terms-and-conditions", link_title: "Terms & Conditions" }, { link: "/terms-of-service", link_title: "Terms of Service" }, { link: "/privacy-policy", link_title: "Privacy Policy" }, { link: "/risk-disclaimer", link_title: "Risk Disclaimer" },]
   },
]

const Footer = () => {
   return (
      <footer>
         <div className="footer-area footer-bg" style={{ backgroundImage: `url(/assets/img/bg/footer_bg.png)` }}>
            <div className="container">
               <div className="footer-top">
                  <div className="row">
                     {footer_data.map((item) => (
                        <div key={item.id} className={item.class_name}>
                           <div className="footer-widget">
                              <h4 className="fw-title">{item.title}</h4>
                              <div className="footer-link">
                                 <ul className="list-wrap">
                                    {item.footer_link.map((li, i) => (
                                       <li key={i}><Link href={li.link}>{li.link_title}</Link></li>
                                    ))}
                                 </ul>
                              </div>
                           </div>
                        </div>
                     ))}

                     <div className="col-xl-3 col-lg-4 col-sm-8">
                        <div className="footer-widget">
                           <h4 className="fw-title">Subscribe Newsletter</h4>
                           <div className="footer-newsletter">
                              <p>Stay updated with the latest news and updates by subscribing to our newsletter.</p>
                              <NewsletterForm/>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="footer-bottom">
                  <div className="row">
                     <div className="col-lg-12">
                        <div className="copyright-text">
                           <p>Copyright © 2024 iQopy. All rights reserved.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="footer-shape-wrap">
               <Image src={footerShape_1} alt="" className="alltuchtopdown" />
               <Image src={footerShape_2} alt="" className="leftToRight" />
            </div>
         </div>
      </footer>
   )
}

export default Footer;
