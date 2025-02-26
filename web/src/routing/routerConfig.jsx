import Homepage from "../pages/Homepage";
import { PaginaVuelos } from "../pages/PaginaVuelos";
import RegisterPage from "../pages/Register";
import HotelsPage from "../pages/Hoteles";
import LoginPage from "../pages/Login";


const routerConfig = [
  {
    path: "/",
    element: <Homepage />,
  },{
    path: "/vuelos",
    element: <PaginaVuelos />,
  },{
    path: "/hoteles",
    element: <HotelsPage />,
  },{
    path: "/login",
    element: <LoginPage />,
  },{
    path: "/register",
    element: <RegisterPage />,
  },
];

export default routerConfig;
