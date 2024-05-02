import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Connection from "../Connections/Connection";
import { useParams } from "react-router-dom";
import "./UserSpace.css";
import Logout from "../../utils/Logout";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../hooks/useApp";
import { updateUser, searchConnections } from "../../../feature/UserSlice";
import SearchDialog from "../../utils/SearchDialog";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isSearch, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  function setSearchText(searchText) {
    setSearch(searchText);
  }

  async function fetchData() {
    const res = await axios.get(
      import.meta.env.VITE_BASE_URL + "/user/getUser?id=" + id,
      {
        withCredentials: true,
      }
    );

    dispatch(updateUser(res.data.data));
  }

  const fetchConnections = async () => {
    const res = await axios.get(
      import.meta.env.VITE_BASE_URL +
        "/user/getConnections?id=" +
        id +
        "&pageNo=1",
      {
        withCredentials: true,
      }
    );
    dispatch(searchConnections(res.data.data));
  };

  useEffect(() => {
    fetchData();
    fetchConnections();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL +
          `/user/search?searchText=${isSearch}&pageNo=${pageNo}`,
        {
          withCredentials: true,
        }
      );
      dispatch(searchConnections(res.data.data));
    };
    if (isSearch) {
      fetchData();
    }
  }, [isSearch]);

  const User = useAppSelector((state) => state.userData.user);
  const searchedProfiles = useAppSelector(
    (state) => state.userData.connections
  );

  function handleConnection() {
    if (pageNo !== 1 || !searchedProfiles) {
      fetchConnections();
    }
  }

  return (
    <div className="flex flex-col">
      <div className="Container">
        <div className=" justify-between flex flex-wrap">
          <h1 className="text-6xl text-white font-bold">{User.name}</h1>
          <Logout />
        </div>
        <h2
          className="text-yellow-400 m-4 cursor-pointer"
          onClick={() =>
            navigate(`/userSpace/${User._id}`, { state: User._id })
          }
        >
          Click to Your Space
        </h2>
        <div className="mt-6 flex flex-wrap justify-between">
          <div className="text-white font-bold flex flex-wrap  justify-between">
            <h2 onClick={handleConnection} className="cursor-pointer">
              Your Connections
            </h2>
            {isSearch && <h2>Search Results</h2>}
          </div>
          <div className="flex p-2 text-gray-300">
            <SearchDialog search={setSearchText} />
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex flex-col">
          {searchedProfiles.length === 0 ? (
            <div className=" text-white m-10 ">Please Add into Connections</div>
          ) : (
            searchedProfiles.map((item) => (
              <Connection
                key={item._id}
                connection={item}
                isSearch={isSearch}
                name={User.name}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
