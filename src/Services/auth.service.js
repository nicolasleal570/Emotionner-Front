/**
 * API Calls methods with AXIOS
 */
import axios from "axios";
/**
 * API URL
 */
// const API_URL ="https://emotionner.herokuapp.com/";
const API_URL = "http://localhost:8080/";
/**
 * Registration method
 * @param {*} username
 * @param {*} email
 * @param {*} password
 */
const register = (
  name,
  lastname,
  email,
  birthdate,
  ocupation,
  premium,
  password
) => {
  return axios.post(API_URL + "users/signup", {
    name,
    lastname,
    email,
    birthdate,
    ocupation,
    premium,
    password,
  });
};
/**
 * Login method
 * @param {*} username
 * @param {*} password
 * @returns userdata
 */
const login = (email, password) => {
  return axios
    .post(API_URL + "users/signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
/**
 * Logout method
 */
const logout = () => {
  localStorage.removeItem("user");
};
/**
 * Get current user method
 */
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const isAuth = (user) => {
  if (user) {
    return true;
  } else {
    return false;
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  isAuth,
};
