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
    try {
      const res = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": sessionStorage.getItem("csrf_access_token"),
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok || !data.user) {
        throw new Error(data.error || "Email o contraseña incorrecta");
      }
  
      sessionStorage.setItem("csrf_access_token", data.csrf_token);
      setUser(data.user);
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message);
    }
  };
  
  const editUser = async (username, email, first_name, last_name, country, city, address, phone_number, photo) => {
    fetch(`${baseUrl}/users`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": sessionStorage.getItem("csrf_access_token"),
        },
        body: JSON.stringify({
          username: username,
          email: email,
          first_name: first_name,
          last_name: last_name,
          country: country,
          city: city,
          address: address,
          phone_number: phone_number,
          photo: photo, 
        }),
      })
      .then((res) => res.json())
      .then((data) => {
      setUser(data.user)
      alert("Cambios realizados correctamente")
      navigate("/")
    });
  };
  
  const logout = async () => {
    try {
      const res = await fetch(`${baseUrl}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": sessionStorage.getItem("csrf_access_token"),
        },
      });
  
      if (!res.ok) throw new Error("Error al cerrar sesión");
  
      sessionStorage.removeItem("csrf_access_token");
      setUser({});
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
      alert(error.message);
    }
  };
  
  const register = async (username, email, password, first_name, last_name, country, city, address, phone_number, photo) => {
    return await fetch(`${baseUrl}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": sessionStorage.getItem("csrf_access_token"),
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        country: country,
        city: city,
        address: address,
        phone_number: phone_number,
        photo: photo,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        throw new Error(data.error || "An error occurred while registering.");
      }
      return login(email, password); // Log the user in after registration
    });
  };
  
 
  return (
    <UserContext.Provider value={{ user,setUser, login, logout, register,editUser }}>
      {children}
    </UserContext.Provider>
  )}