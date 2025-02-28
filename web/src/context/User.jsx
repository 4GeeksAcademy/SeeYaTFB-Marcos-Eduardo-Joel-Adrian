import { createContext, useState } from "react";
import { baseUrl } from "../services/api/config";
import { useNavigate } from "react-router";


export const UserContext = createContext({
  user: {},
  login: () => { },
  logout: () => { },
  register: () => { },
});

export const UserProvider = ({ children }) => {
  const navigate=useNavigate()

  const [user, setUser] = useState({});

   const login = async (email, password) => {
    return await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": sessionStorage.getItem("csrf_access_token"),
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then((res)=> res.json())
    .then((data) => {
      if (!data.user) {
        throw new Error("Email o contraseña equivocada");
      }

      sessionStorage.setItem("csrf_access_token", data.csrf_token);
      setUser(data.user);
      navigate("/")
    });
  };
  
  
  const logout = async () => {
    return await fetch(`${baseUrl}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": sessionStorage.getItem("csrf_access_token"),
      },
    })
    .then((res)=> res.json())
    .then(() => {
      setUser({});
      navigate("/")
    });
  };

  const register = async (username, email, password, first_name, last_name, country, city, address, phone_number, photo) => {
       return await fetch(`${baseUrl}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username:username,
          email:email,
          password:password,
          first_name:first_name,
          last_name:last_name,
          country:country,
          city:city,
          address:address,
          phone_number:phone_number,
          photo: photo ? photo.name : null,
        })})
        .then((res)=>res.json())
        .then(() => {
          login(email,password)
        });
      };
    
  return (
    <UserContext.Provider value={{ user,setUser, login, logout, register }}>
      {children}
    </UserContext.Provider>
  )}
