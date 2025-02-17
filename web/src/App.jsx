import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import routerConfig from "./routing/routerConfig";


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {routerConfig.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
