import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Front from "./pages/front";
import SingelStory from "./components/SingelStory";
import useAuthStore from "./context/AuthContext";
import UserStory from "./components/UserStory";
import { Toaster } from "sonner";

function App() {
  const { fetchUser, user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  },[]);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Front />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/dashboard/:id' element={<SingelStory />} />
          <Route path='/YourStory' element={<UserStory />} />
        </Routes>
        <Toaster richColors position='top-right' />
      </Router>
    </>
  );
}

export default App;
