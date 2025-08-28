import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import ApiClient from "../../service/apiClient.js";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../context/AuthContext";
import { toast } from "sonner";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false); // 👈 new state
  const navigate = useNavigate();

  const { setUser, setStories } = useAuthStore();

  const signuphandaler = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    try {
      const res = await ApiClient.signUp(fullName, email, password);
      const user = res.data.user;
      setUser(user);

      const storiesRes = await ApiClient.getAllStories();
      const allStory = storiesRes.data.data;
      setStories(allStory);

      navigate("/dashboard");
      toast.success("Welcome to Travel Blogger!");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Signup failed. Please check your details.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  // 👇 button disable condition
  const isDisabled = !fullName || !email || !password || loading;

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-[#F8F8FF] p-4'>
      <div className='flex flex-col sm:flex-row rounded-xl overflow-hidden bg-white/90 w-full max-w-7xl min-h-[600px] sm:min-h-[700px] shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px]'>
        {/* Left Side */}
        <div className='hidden sm:block sm:flex-1 relative bg-cover bg-center h-80 sm:h-auto bg-[url(/signup.jpg)]'>
          <div className='absolute inset-0 bg-[rgba(32,50,99,0.5)] flex flex-col items-center justify-center h-full gap-10 lg:gap-20 px-4 text-center'>
            <h2 className='text-white text-xl md:text-3xl lg:text-3xl font-semibold leading-snug drop-shadow-md font-display2'>
              TRAVEL IS THE ONLY THING
              <br />
              YOU BUY THAT MAKES YOU
              <br />
              RICHER
            </h2>
            <div className='flex gap-4 text-xl md:text-2xl lg:text-3xl text-white'>
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='flex-1 w-full bg-[#1143a0] flex justify-center items-center p-4 sm:p-6 lg:p-10'>
          <div className='w-full max-w-sm text-white'>
            <h2 className='tracking-widest text-center mb-6 sm:mb-8 lg:mb-10 font-display text-xl lg:text-2xl font-bold'>
              TRAVEL BLOGGER
            </h2>

            <div className='flex justify-center gap-4 sm:gap-6 text-2xl lg:text-3xl mb-3 sm:mb-4'>
              <FaFacebook />
              <FaGoogle />
            </div>

            <span className='block text-center text-xs sm:text-sm opacity-80 mb-4 sm:mb-5 font-display'>
              or use your email account
            </span>

            <form className='space-y-3 sm:space-y-4'>
              <input
                type='text'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder='Fullname'
                className='w-full px-4 py-2 rounded-full border-none outline-none bg-white/10 text-white placeholder-white/70 focus:bg-white/25 text-sm sm:text-base'
              />

              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className='w-full px-4 py-2 rounded-full border-none outline-none bg-white/10 text-white placeholder-white/70 focus:bg-white/25 text-sm sm:text-base'
              />

              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                className='w-full px-4 py-2 rounded-full border-none outline-none bg-white/10 text-white placeholder-white/70 focus:bg-white/25 text-sm sm:text-base'
              />

              <div className='text-right mb-3 sm:mb-4'>
                <a
                  href='/login'
                  className='text-white/80 text-xs sm:text-sm hover:text-white transition-colors'
                >
                  Login
                </a>
              </div>

              <button
                type='submit'
                onClick={signuphandaler}
                disabled={isDisabled} // 👈 disable
                className={`w-full px-4 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base lg:text-lg shadow transition-colors ${
                  isDisabled
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-white text-[#24427a] hover:bg-[#f2f7ff]"
                }`}
              >
                {loading ? "Creating..." : "CREATE YOUR ACCOUNT"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
