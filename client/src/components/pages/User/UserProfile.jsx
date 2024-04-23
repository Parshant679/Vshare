import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Connection from "../Connections/Connection";
import "./UserSpace.css";
import Logout from "../../utils/Logout";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const User = useLocation().state;
  const id = User._id;

  async function fetchData() {
    const res = await axios.get(
      import.meta.env.VITE_BASE_URL + "/user/getUser?id=" + id
    );

    console.log(res);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [connections, getConnections] = useState("");
  const [isSearch, setSearch] = useState("");

  function handleInput() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="Container">
        <div className=" justify-between flex ">
          <h1 className="text-6xl text-white font-bold">{User.name}</h1>
          <Logout />
        </div>
        <h2
          className="text-yellow-400 m-4"
          onClick={() => navigate(`/userSpace/${User._id}`, { state: User })}
        >
          My Space
        </h2>
        <div className="mt-6 flex flex-wrap justify-between">
          <h2 className=" text-white font-bold">Your Connections</h2>
          <div className="flex p-2 text-gray-300">
            <IoSearchOutline onClick={handleInput} />
            <input
              type="text"
              placeholder="Search"
              className="mx-1 outline-none font-size text-xs bg-black "
              onChange={(e) => {
                return setSearch(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <hr className="border-gray-500" />
        {/* <div className="flex flex-col">
          {User.connections ? (
            <div className=" text-white m-10 ">Please Add into connection</div>
          ) : (
            User.connections.map((item) => (
              <Connection key={item._id} connection={itme} />
            ))
          )}
        </div> */}
      </div>
    </div>
  );
}

export default UserProfile;
