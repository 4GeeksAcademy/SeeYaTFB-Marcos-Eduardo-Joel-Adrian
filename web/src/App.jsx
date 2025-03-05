import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import routerConfig from "./routing/routerConfig";
import { useState } from "react";
import Footer from "./components/Footer";



function App() {
  const [filters, setFilters] = useState({});

  return (
    <>
      <NavBar />
      <Routes>
        {routerConfig.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
