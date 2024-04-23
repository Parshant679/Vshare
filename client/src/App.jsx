import React, { Suspense, lazy } from "react";
import "./App.css";
import Home from "./components/pages/Home/Home";
import UserProfile from "./components/pages/User/UserProfile";
import UserSpace from "./components/pages/User/UserSpace";
const Login = lazy(() => import("./components/auth/Login"));
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from "./components/utils/Logout";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<div>Loading..</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/video/:id" />
            <Route path="/userProfile/:id" element={<UserProfile />} />
            <Route path="/userSpace/:id" element={<UserSpace />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
