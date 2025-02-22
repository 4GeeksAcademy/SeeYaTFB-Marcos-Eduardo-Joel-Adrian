import Homepage from "../pages/Homepage";
import BusquedaVuelos from "../components/BusquedaVuelos";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HotelsPage from "../pages/Hoteles";


const routerConfig = [
  {
    path: "/",
    element: <Homepage />,
  },{
    path: "/vuelos",
    element: <BusquedaVuelos />,
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
