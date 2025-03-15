import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Projects from "./pages/projects";
import Teaching from "./pages/teaching";
import Notes from "./pages/notes";
import Login from './pages/login'
import Home from './pages/home'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/login" element={<Login />} />
          

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
