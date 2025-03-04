import Homepage from "../pages/Homepage";
import { PaginaVuelos } from "../pages/PaginaVuelos";
import RegisterPage from "../pages/Register";
import { PaginaHoteles } from "../pages/PaginaHoteles";
import LoginPage from "../pages/Login";
import { PaginaCoches } from "../pages/PaginaCoches";



const routerConfig = [
  {
    path: "/",
    element: <Homepage />,
  },{
    path: "/vuelos",
    element: <PaginaVuelos />,
  },{
    path: "/hoteles",
    element: <PaginaHoteles />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },{
    path: "/register",
    element: <RegisterPage />,
  },{
    path: "/coches",
    element: <PaginaCoches />,
  },
];

export default routerConfig;
