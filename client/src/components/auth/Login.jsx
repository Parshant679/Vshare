import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      window.location.href = "/user/123";
      await axios.post(import.meta.env.VITE_API_BASE_URL + "/user/login", {
        ...user,
      });
      localStorage.setItem("firstLogin", true);
    } catch (err) {
      alert(err.response.msg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 h-96">
      <h1 className="text-3xl font-bold text-gray-500 mb-8">Login</h1>
      <form
        onSubmit={loginSubmit}
        className="flex flex-col space-y-4 w-full max-w-md"
      >
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-500 mb-2"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            required
            placeholder="email"
            value={user.email}
            onChange={onChangeInput}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-500 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={user.password}
            onChange={onChangeInput}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col item-center  my-3">
          <button
            type="submit"
            className=" px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
          <Link to="/" className="text-blue-500 hover:underline">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
