import React from "react";
import Navbar from "../../components/Navbar.jsx";
import Body from "../../components/Body.jsx";
import useAuthStore from "../../context/AuthContext";
import Loading from "../../components/Loading.jsx";

function Home() {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Body />
      </div>
    </div>
  );
}

export default Home;
