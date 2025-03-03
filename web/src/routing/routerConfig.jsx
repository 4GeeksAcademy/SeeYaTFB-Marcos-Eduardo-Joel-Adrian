import Homepage from "../pages/Homepage";
import { PaginaVuelos } from "../pages/PaginaVuelos";
import RegisterPage from "../pages/Register";
import { PaginaHoteles } from "../pages/PaginaHoteles";
import LoginPage from "../pages/Login";



const routerConfig = [
  {
    path: "/",
    element: <Homepage />,
  },{
    path: "/flights",
    element: <PaginaVuelos />,
  },{
    path: "/hotels",
    element: <PaginaHoteles />,
  },
  ,{
    path: "/cars",
    element: "",
  },
  {
    path: "/login",
    element: <LoginPage />,
  },{
    path: "/register",
    element: <RegisterPage />,
  },
];

export default routerConfig;
