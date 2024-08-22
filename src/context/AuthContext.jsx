import { useState, useEffect, createContext } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserFromLocalStorage = () => {
    const initUser = JSON.parse(localStorage.getItem("user"));
    if (initUser) {
      if (Date.now() < initUser.expiry) {
        setUser({
          id: initUser.id,
          username: initUser.username,
          role: initUser.role,
        });
      } else {
        localStorage.removeItem("user");
      }
    }
  };

  useEffect(() => {
    setUserFromLocalStorage();
  }, []);


  const login = async (loginData) => {
    const response = await axios.get("http://localhost:9999/users", {
      params: {
        username: loginData.username,
        password: loginData.password
      }
    });

    console.log(response)
    if (response.status === 200) {
      const userData = response.data[0];
      const expiryTime = Date.now() + 10 * 60 * 1000;

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userData.id,
          username: userData.username,
          role: userData.role,
          expiry: expiryTime,
        })
      );

      setUser({
        id: userData.id,
        username: userData.username,
        role: userData.role,
      });

      return response.data;
    } else {
      console.log("Invalid username or password");
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo) {
      return false;
    }
    if (Date.now() >= userInfo.expiry) {
      logout();
      return false;
    }
    return true;
  };

  const isAdmin = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo) {
      return false;
    }
    return userInfo.role === "admin";
  };

  const isMember = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo) {
      return false;
    }
    return userInfo.role === "member";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin, isMember, setUserFromLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthContext;
