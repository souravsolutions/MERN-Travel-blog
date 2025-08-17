import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import ApiClient from "../../service/apiClient.js";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../context/AuthContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const allStory = useAuthStore((state) => state.allStory);

  const loginHandeler = async (e) => {
    e.preventDefault();
    try {
      const res = await ApiClient.login(email, password);
      const user = res.data.user;
      login(user);

      const storiesRes = await ApiClient.getUserStories();
      allStory(storiesRes.data.data);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-[#F8F8FF]'>
      <div className='flex flex-col md:flex-row rounded-xl shadow-2xl overflow-hidden bg-white/90 w-full max-w-7xl min-h-[700px] box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;'>
        <div className='md:flex-1 relative bg-cover bg-center h-200 bg-[url(/login-image.jpeg)] '>
          <div className='absolute inset-0 bg-[rgba(32,50,99,0.5)] flex flex-col items-center justify-center h-full gap-20'>
            <h2 className='text-white text-3xl font-semibold text-center mb-8 leading-snug drop-shadow-md font-display2'>
              TRAVEL IS THE ONLY THING <br /> YOU BUY THAT MAKES YOU <br />{" "}
              RICHER
            </h2>
            <div className='flex gap-4 text-2xl text-white'>
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>
        </div>

        <div className='md:flex-1 w-full bg-[#1143a0] flex justify-center items-center p-8'>
          <div className='w-full max-w-sm text-white '>
            <h2 className='tracking-widest text-center mb-10 font-display text-2xl font-bold'>
              TRAVEL BLOGGER
            </h2>
            <div className='flex justify-center gap-6 text-4xl mb-4'>
              <FaFacebook />
              <FaGoogle />
            </div>
            <span className='block text-center text-sm opacity-80 mb-5 font-display'>
              or use your email account
            </span>
            <form>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className='w-full p-3 mb-4 rounded-full border-none outline-none bg-white/10 text-white placeholder-white/70 focus:bg-white/25'
              />
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                className='w-full p-3 mb-4 rounded-full border-none outline-none bg-white/10 text-white placeholder-white/70 focus:bg-white/25'
              />
              <div className='text-right mb-4'>
                <a href='#' className='text-white/80 text-sm'>
                  Forgot Your Password?
                </a>
              </div>
              <button
                type='submit'
                onClick={loginHandeler}
                className='w-full p-3 rounded-full bg-white text-[#24427a] font-bold text-lg shadow hover:bg-[#f2f7ff]'
              >
                ENTER
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
