import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from 'react-hot-toast';
import NavBar from "./components/common/NavBar";
import EmailVerification from "./pages/EmailVerification";



function App() {
  return (
    <div className="w-screen min-h-screen  bg-richblack-900">
      <Toaster />
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verify-email" element={<EmailVerification/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
