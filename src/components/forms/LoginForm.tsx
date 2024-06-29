"use client"
import { useState } from "react";
import CloseEye from "@/svg/CloseEye";
import OpenEye from "@/svg/OpenEye";
import Link from "next/link";
import axios from 'axios';

import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
   email: string;
   password: string;
}

const LoginForm = ({ style }: any) => {

   const schema = yup
      .object({
         email: yup.string().required().email().label("Email"),
         password: yup.string().required().label("Password"),
      })
      .required();
 
   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   
   const onSubmit = async (data: FormData) => {
      try {
          const response = await axios.post('http://localhost:5000/login', data);
          
          if (response.status === 200) {
              const notify = () => toast('Login successful', { position: 'top-center' });
              notify();
              reset();
  
              // Store the user's id and JWT in local storage
              localStorage.setItem('userId', response.data.id);
              localStorage.setItem('jwt', response.data.token);
  
              // Redirect to /private-sale
              window.location.href = '/private-sale';
          } else {
              const notify = () => toast(response.data.error || 'Login failed', { position: 'top-center' });
              notify();
          }
      } catch (error) {
          if (axios.isAxiosError(error)) {
              console.error('Error logging in:', error);
              const errorMessage = error.response?.data.error || 'Error logging in';
              const notify = () => toast(errorMessage, { position: 'top-center' });
              notify();
          }
      }
  };

   const [isPasswordVisible, setPasswordVisibility] = useState(false);

   const togglePasswordVisibility = () => {
      setPasswordVisibility(!isPasswordVisible);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="eg-login__input-wrapper">
            <div className="eg-login__input-box">
               <div className="eg-login__input">
                  <label htmlFor="email">Your Email</label>
                  <input id="email" {...register("email")} type="email" placeholder="hello@iqopy.com" />
                  <p className="form_error">{errors.email?.message}</p>
               </div>
            </div>
            <div className="eg-login__input-box">
               <div className="eg-login__input">
                  <label htmlFor="eg-password__input">Password</label>
                  <div className="eg-password-show">
                     <input id="eg-password__input" {...register("password")} type={isPasswordVisible ? "text" : "password"} placeholder="Min. 6 characters" />
                     <div className="eg-login__input-eye" id="eg-password__show-toggle" onClick={togglePasswordVisibility} >
                        {isPasswordVisible ? (
                           <span id="eg-password__show" className="eye-open"><CloseEye /></span>
                        ) : (
                           <span id="eg-password__hide" className="open-close"><OpenEye /> </span>
                        )}
                     </div>
                  </div>
                  <p className="form_error">{errors.password?.message}</p>
               </div>
            </div>
         </div>
         <div className="eg-login__suggetions d-flex align-items-center justify-content-between mb-20">
            <div className="eg-login__remeber">
               <input id="remeber" type="checkbox" />
               <label htmlFor="remeber">Remember me</label>
            </div>
            <div className="eg-login__forgot">
               <Link href="/forgot">Forgot Password?</Link>
            </div>
         </div>
         <div className="eg-login__bottom">
            <button type="submit" className="btn w-100">Login</button>
         </div>
      </form>
   )
}

export default LoginForm
