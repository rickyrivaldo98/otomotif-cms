import './App.style.scss';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import DataPage from './pages/DataPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import { useState } from "react";

function App() {
  const [collapseShow, setCollapseShow] = useState(false);
  return (
    <>
      <Sidebar collapse={collapseShow} />
      <div className={`container-${collapseShow ? "collapse" : "noCollapse"}`}>
        <Header setCollapse={setCollapseShow} collapse={collapseShow} />
        <div className="container-content">
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/DataPage' element={<DataPage />} />
          </Routes>
        </div>
        <Footer setCollapse={setCollapseShow} collapse={collapseShow} />
      </div >
    </>
  );
}

export default App;
