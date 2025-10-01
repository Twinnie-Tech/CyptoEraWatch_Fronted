'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import "@css/output.css";
import googleLogo from "../../public/assets/images/Google auth logo.png";
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect:true, // Redirect after successful login
        callbackUrl: '/', // Redirect to the homepage
      });
     
      if (!result?.ok) {
        toast.error("Invalid email or password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
     toast.error("Something went wrong!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    }
  };

  return (
    <section className="min-h-screen flex items-stretch text-white">
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)',
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10">
          <h1 className="text-5xl font-bold text-left tracking-wide orange_gradient">CryptoEraWatch</h1>
          <p className="text-3xl my-4">Master cryptocurrency</p>
        </div>
      </div>
      <div
        className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
        style={{ backgroundColor: '#161616' }}
      >
        <div className="w-full py-6 z-20">
          <h1 className="text-4xl font-bold mb-6">Sign In</h1>
          <div className="py-6 space-y-4">
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="uppercase block w-full flex justify-center gap-5 items-center p-4 text-lg rounded-full bg-orange-500 hover:bg-orange-600 focus:outline-none"
            >
              <span><Image src={googleLogo} width={20} height={20} alt='google logo' /></span>
              <span>Sign in with Google</span>
            </button>
          </div>
          <p className="text-gray-100">or use your email account</p>
          <form
            onSubmit={handleEmailSignIn}
            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
          >
            <div className="pb-2 pt-4">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-4 text-lg rounded-sm bg-black"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="pb-2 pt-4 relative">
              <input
                className="block w-full p-4 text-lg rounded-sm bg-black"
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-4  cursor-pointer text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash  className='absolute top-0'/> : <FaEye  className='absolute top-0'/>} 
              </span>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
              <a href="#">Forgot your password?</a>
            </div>
            <div className="px-4 pb-2 pt-4">
              <button
                type="submit"
                className="uppercase block w-full p-4 text-lg rounded-full bg-orange-500 hover:bg-orange-600 focus:outline-none"
              >
                Sign in
              </button>
            </div>
            <div className="text-center mt-4 text-gray-400 hover:underline hover:text-gray-100">
              <a href="/SignUp">Don't have an account? Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;