import React from "react";
import "./App.css";
import Home from "./components/pages/Home/Home";
import UserProfile from "./components/pages/User/UserProfile";
import UserSpace from "./components/pages/User/UserSpace";
import Login from "./components/auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from "./components/utils/Logout";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/userSpace/:id" element={<UserSpace />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
