import Homepage from "../pages/Homepage";
import { PaginaVuelos } from "../pages/PaginaVuelos";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HotelsPage from "../pages/Hoteles";


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
    element: <Login />,
  },{
    path: "/register",
    element: <Register />,
  },
];

export default routerConfig;
