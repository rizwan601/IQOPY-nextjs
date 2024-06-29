"use client"
import Link from "next/link";
import Image from "next/image";
import login_option_1 from "@/assets/img/icons/google.svg";
import login_option_2 from "@/assets/img/icons/facebook.svg";
import RegisterForm from "@/components/forms/RegisterForm";
import LoginForm from "@/components/forms/LoginForm";

const LogingArea = ({ style }: any) => {

   return (
      <section className="eg-login__area pt-140 pb-140 p-relative z-index-1 fix">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="eg-login__wrapper">
                     {style ? (
                        <div className="eg-login__top text-center mb-30">
                           <h3 className="eg-login__title">Sing Up iQopy.</h3>
                           <p>Already have an account? <span><Link href="/login">Sing In</Link></span></p>
                        </div>) : (
                        <div className="eg-login__top text-center mb-30">
                           <h3 className="eg-login__title">Login to iopy.</h3>
                           <p>Don’t have an account? <span><Link href="/register">Create a free account</Link></span></p>
                        </div>)}
                     <div className="eg-login__option">
                        {style ? <RegisterForm /> : <LoginForm />}
                        {/*<div className="eg-login__mail text-center mt-20 mb-20">
                           <p>or</p>
                        </div>
                        <div className="eg-login__social mb-10 ">
                           <div className="eg-login__option-item">
                              <Link href="#"><Image src={login_option_1} alt="" /> Sign in with google </Link>
                           </div>
                           <div className="eg-login__option-item">
                              <Link href="#">  <Image src={login_option_2} alt="" /> Sign in with facebook </Link>
                           </div>
                        </div>*/ }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default LogingArea;
