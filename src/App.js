import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import ToolsCarousel from "./components/ToolRoom";
import Footer from "./components/footer";
import WhyChooseUs from "./components/Whyus";
import ReadinessForm from "./components/ReadinessForm";
import ReadinessScore from "./components/ReadinessScore";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={
          <>
            <Navbar/>
            <Home/>
            <AboutUs/>
            <WhyChooseUs/>
            <ReadinessForm/>
            <ToolsCarousel/>
            <Footer/>
          </>
          }
          />
          <Route path='/readiness-score' element={
          <>
            <ReadinessScore/>
          </>
          }
        />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
