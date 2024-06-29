"use client"
import faq_data from "@/data/FaqData";
import { useEffect, useState } from "react";

interface faqItem {
   id: number;
   question: string;
   answer: string;
   showAnswer: boolean;
}

const FAQ = () => {

   const [faqData, setFaqData] = useState<faqItem[]>([]);

   useEffect(() => {
      const initialFaqData: faqItem[] = faq_data.map((faq, index) => ({
         ...faq,
         showAnswer: index === 0,
      }));
      setFaqData(initialFaqData);
   }, []);

   const toggleAnswer = (index: number) => {
      setFaqData((prevFaqData) => {
         const updatedFaqData = prevFaqData.map((faq, i) => ({
            ...faq,
            showAnswer: i === index ? !faq.showAnswer : false,
         }));
         return updatedFaqData;
      });
   };

   return (
      <section className="faq-area">
         <div className="container">
            <div className="faq-inner-wrap">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="section-title text-center mb-70">
                        <h2 className="title">Frequently Asked Questions</h2>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-lg-12">
                     <div className="faq-wrap">
                        <div className="accordion" id="accordionExample">
                           {faqData.map((item, index) => (
                              <div key={index} className={`accordion-item ${item.showAnswer ? "active" : ""}`}>
                                 <h2 className="accordion-header">
                                    <button className={`accordion-button ${item.showAnswer ? "" : "collapsed"}`} onClick={() => toggleAnswer(index)} type="button">
                                       {item.question}
                                    </button>
                                 </h2>
                                 {item.showAnswer && (
                                    <div id="collapseOne" className="accordion-collapse collapse show">
                                       <div className="accordion-body">
                                          <p>{item.answer}</p>
                                       </div>
                                    </div>
                                 )}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default FAQ;