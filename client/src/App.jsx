import React, { Suspense } from "react";
import "./App.css";
import Home from "./components/pages/Home/Home";
import User from "./components/pages/User/User";
import Login from "./components/auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<div>Loading..</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/video/:id" />
            <Route path="/user/:id" element={<User />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
