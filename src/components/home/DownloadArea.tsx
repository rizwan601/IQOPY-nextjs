import Link from "next/link"
import Image from "next/image"

import downloadBtnImg_1 from "@/assets/img/images/download_btn01.png"
import downloadBtnImg_2 from "@/assets/img/images/download_btn02.png"
import downloadImg_1 from "@/assets/img/images/download_img01.png"
import downloadImg_2 from "@/assets/img/images/download_img02.png"
import downloadShape_1 from "@/assets/img/images/download_shape01.png"
import downloadShape_2 from "@/assets/img/images/download_shape02.png"

const DownloadArea = () => {
   return (
      <section className="download-area pt-130 pb-130">
         <div className="container">
            <div className="download-inner-wrap">
               <div className="row align-items-end">
                  <div className="col-lg-6">
                     <div className="download-content">
                        <div className="section-title mb-40">
                           <h2 className="title">Mobile Application Coming Soon</h2>
                        </div>
                        <div className="download-list">
                           <ul className="list-wrap">
                              {/*<li><span>1</span>White Paper</li>
                              <li><span>2</span>Privacy & Policy</li>*/}
                           </ul>
                        </div>
                        <div className="download-btn-wrap">
                           <Link href="#" className="download-btn"><Image src={downloadBtnImg_1} alt="" /></Link>
                           <Link href="#" className="download-btn"><Image src={downloadBtnImg_2} alt="" /></Link>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-6">
                     <div className="download-img">
                        <Image src={downloadImg_1} alt="" />
                        <Image src={downloadImg_2} alt="" />
                     </div>
                  </div>
               </div>
               <div className="download-shape-wrap">
                  <Image src={downloadShape_1} alt="" />
                  <Image src={downloadShape_2} alt="" />
               </div>
            </div>
         </div>
      </section>
   )
}

export default DownloadArea
