import Homepage from "../pages/Homepage";
import BusquedaVuelos from "../components/BusquedaVuelos";
import Login from "../pages/Login";
import Register from "../pages/Register";

const routerConfig = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/vuelos",
    element: <BusquedaVuelos />,
  },{
    path: "/login",
    element: <Login />,
  },{
    path: "/register",
    element: <Register />,
  },
];

export default routerConfig;
