import { createContext, useState } from "react";

import { baseUrl } from "../services/api";

export const UserContext = createContext({
  user: {},
  login: () => { },
  logout: () => { },
  register: () => { },
});

export const UserProvider = ({ children }) => {
  
  const [user, setUser] = useState({});

  const login = async (email, password) => {
    try {
      const response = await fetch("https://redesigned-space-potato-97qx6p4676v9hx6x5-5000.app.github.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Correo o contraseña incorrectos.");
      }
  
      const data = await response.json(); // Convertimos la respuesta en JSON
  
      if (data.msg !== "login successful") {
        throw new Error(data.msg || "Error desconocido.");
      }
      setUser(data.user); 
      sessionStorage.setItem("csrf_access_token", data.csrf_token);
      return { success: true, user: data.user };

    } catch (error) {
      console.error("Error en el login:", error);
      return { success: false, message: error.message };
    }
  };
  
  const logout = async () => {
    return fetch(`${baseUrl}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setUser({});
    });
  };

  const register = async (username, email, password,first_name,last_name,country,city,address,phone_number,photo) => {
    return await fetch(`${baseUrl}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        first_name:first_name,
        last_name:last_name,
        country:country,
        city:city,
        address:address,
        phone_number:phone_number,
        photo:photo
      }),
    }).then(() => {
      login(email, password);
    });
  };

  return (
    <UserContext.Provider value={{ user,setUser, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};