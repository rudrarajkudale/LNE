import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect } from "react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Teaching from "./components/Teaching";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import Contactus from "./components/Contactus";
import CreatePost from "./components/CreatePost";
import AboutUs from "./components/Aboutus";
import AdminProtect from "./components/AdminProtect";
import Admin from "./AdminComponents/Admin";
import FloatingIcons from "./components/FloatingIcons";
import './styles/Tostify.css';

function RedirectIfLoggedIn({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      toast.info('🎉 You are already logged in!', {
            className: 'toast-custom',
            icon: false
          });
      navigate("/");
    }
  }, [navigate]);

  return children;
}

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/teaching" element={<Teaching />} />
            <Route path="/notes" element={<Notes />} />

            <Route
              path="/login"
              element={
                <RedirectIfLoggedIn>
                  <Login />
                </RedirectIfLoggedIn>
              }
            />
            <Route
              path="/register"
              element={
                <RedirectIfLoggedIn>
                  <Register />
                </RedirectIfLoggedIn>
              }
            />

            <Route path="/contactus" element={<Contactus />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/admin/*" element={<AdminProtect><Admin /></AdminProtect>} />
            <Route
              path="*"
              element={
                <div className="d-flex justify-content-center align-items-center" style={{
                  height: "70vh",
                  flexDirection: "column"
                }}>
                  <h1 className="display-4 mb-4" style={{ color: "#f5b820" }}>
                    404 - Page Not Found
                  </h1>
                  <p className="lead" style={{ color: "#f5b820" }}>
                    The page you're looking for doesn't exist.
                  </p>
                  <a
                    href="/"
                    className="btn mt-3"
                    style={{
                      backgroundColor: "#f5b820",
                      color: "white",
                      padding: "8px 20px",
                      borderRadius: "5px",
                      textDecoration: "none",
                      width: "10rem"
                    }}
                  >
                    Go Back Home
                  </a>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
      <FloatingIcons />
    </>
  );
}

export default App;
