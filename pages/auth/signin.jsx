// Login.js
import React from 'react';
import Logo from "../../public/logo.png";
import Image from "next/image"
import { useState } from 'react';
import Link from "next/link"


const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const signinHandler = (e) =>{
        e.preventDefault();
        console.log("data", email, password);
    }

  return (
    <div className="bg-gray-100 min-h-screen grid md:flex items-center justify-center px-0 md:px-40">
      <div className=" bg-white shadow p-8 w-full md:w-1/2">
        <div className="mb-8 flex justify-center">
          <a href="/" className="">
            <Image 
            width={60}
            src={Logo} alt="Logo" />
          </a>
        </div>
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">Login into your account</h2>
        </div>
        <form onSubmit={signinHandler}>
          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                  name="email"
                  className="form-input py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="password"
                  value={password}
                  onChange={(e)=>setpassword(e.target.value)}
                  name="password"
                  className="form-input py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="text-right">
              <a href="/" className="text-blue-600 text-sm">
                Forgot Password?
              </a>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:border-orange-600 focus:shadow-outline-orange active:bg-orange-800 transition duration-150 ease-in-out"
              >
                Login Now
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-500">or</p>
            </div>
            <div className="mt-4">
              <Link
                href = "/auth/signup"
                
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-orange-500 text-base leading-6 font-medium rounded-md text-orange-500 hover:text-orange-600 focus:outline-none focus:border-orange-600 focus:shadow-outline-orange active:text-orange-800 transition duration-150 ease-in-out"
              >
                Signup Now
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <img src="https://svgshare.com/i/nDi.svg" alt="Extra" />
        </div>
      </div>
    </div>
  );
};

export default Login;
