'use client';
import { useEffect, useState } from 'react';
import Image from "next/image"
import Link from "next/link";

import contributionShape_1 from "@/assets/img/images/contribution_shape01.png";
import contributionShape_2 from "@/assets/img/images/contribution_shape02.png";

import { getBNBDeposit } from '@/ui/SmartContractDeposits';

// Function to calculate the progress bar width
function calculateProgressBarWidth(currentDeposit: string, startingDeposit: string, targetDeposit: string): string {
   const current = parseFloat(currentDeposit) + parseFloat(startingDeposit);
   const target = parseFloat(targetDeposit);
   const width = (current / target) * 100;
   return `${width.toFixed(2)}%`; // Limit to 2 decimal places and add the '%' sign
}

const Contribution = () => {
   const [deposit, setDeposit] = useState<string>('0');
   const [progressBarWidth, setProgressBarWidth] = useState<string>('0%');
   const [targetDeposit, setTargetDeposit] = useState<string>('25000'); // replace '100' with your target deposit
   const [startingDeposit, setStartingDeposit] = useState<string>('2636.30'); // replace '0' with your starting deposit
   
   useEffect(() => {
      getBNBDeposit()
          .then(bnbDeposit => {
              const totalDeposit = parseFloat(bnbDeposit) + parseFloat(startingDeposit);
              setDeposit(totalDeposit.toLocaleString()); // Format the deposit with commas
              const width = calculateProgressBarWidth(bnbDeposit, startingDeposit, targetDeposit);
              setProgressBarWidth(width); // Set the progress bar width
          })
          .catch(error => {
              console.error('Error getting BNB deposit:', error);
          });
  }, [startingDeposit, targetDeposit]);
 
   return (
     <section id="contribution" className="contribution-area pt-130 pb-130">
       <div className="container">
         <div className="row justify-content-center">
           <div className="col-lg-10">
             <div className="contribution-title">
               <h2 className="title"><span>$ {deposit}</span> Funds Raised</h2>
                  </div>
                  <div className="progress-wrap">
                     <ul className="list-wrap">
                        <li>Seed-Sale</li>
                        <li>Private-Sale</li>
                        <li>soft cap</li>
                     </ul>
                     <div className="progress" role="progressbar">
                        <div className="progress-bar" style={{ width: progressBarWidth }}></div>
                     </div>
                     <h6 className="progress-title"> {progressBarWidth} target raised <span>$ 1 = 2,000 IQO</span></h6>
                  </div>
                  <div className="contribution-btn">
                     <Link href="/register" className="btn">Purchase a Token</Link>
                     <Link href="/#read-documents" className="btn btn-two">Read White Paper</Link>
                  </div>
               </div>
            </div>
         </div>
         <div className="contribution-shape-wrap">
            <Image src={contributionShape_1} alt="" className="alltuchtopdown" />
            <Image src={contributionShape_2} alt="" className="leftToRight" />
         </div>
      </section>
   )
}

export default Contribution