import React, { useState } from "react";
import "./UserSpace.css";
import { VscListFilter } from "react-icons/vsc";
import { IoSearchOutline } from "react-icons/io5";
import { FaSortAmountUp, FaSortAmountDownAlt } from "react-icons/fa";
import {
  MdOutlineIncompleteCircle,
  MdOutlineAssignmentLate,
} from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import VideoData from "../Video/VideoData";
import FormDialog from "../../utils/FormDialog";
import Logout from "../../utils/Logout";
function UserSpace() {
  const [statusType, setStatus] = useState("-1");
  const [isSearch, setSearch] = useState("");
  const [filters, setFilters] = useState({
    sort: 1,
    filters: -1,
  });

  function handleStatus(e) {
    const type = e;

    if (type === "-1") {
      setStatus(-1);
    } else if (type === "0") {
      setStatus(0);
    } else {
      setStatus(1);
    }
  }

  function handleSort() {
    if (filters.sort === 1) {
      setFilters({ ...filters, sort: -1 });
    } else {
      setFilters({ ...filters, sort: 1 });
    }
  }

  function handleInput(e) {
    setSearch(e.target.value);
    console.log(isSearch);
  }

  return (
    <div className="flex flex-col">
      <div className="Container">
        <div className="flex justify-between">
          <h1 className="text-6xl text-white font-bold">My Space</h1>
          <div className="flex justify-around">
            <Logout />
            <FormDialog />
          </div>
        </div>
        <div className="flex flex-wrap mt-10 justify-between">
          <div className="text-12 font-bold  flex flex-wrap cursor-pointer text-gray-400 ">
            <div className="flex flex-wrap p-2 ">
              <MdOutlineAssignmentLate className="m-1" />
              <h2>Not Assigned</h2>
            </div>
            <div className="flex flex-wrap p-2 ">
              <GrInProgress className="m-1" />
              <h2>In Progress</h2>
            </div>
            <div className="flex flex-wrap p-2 ">
              <MdOutlineIncompleteCircle className="m-1" />
              <h2>Completed</h2>
            </div>
          </div>
          <div className="flex flex-wrap cursor-pointer text-gray-400 p-2">
            <div className="p-2 ">
              <VscListFilter />
            </div>
            <div className="p-2 " onClick={handleSort}>
              {filters.sort === 1 ? (
                <FaSortAmountUp />
              ) : (
                <FaSortAmountDownAlt />
              )}
            </div>
            <div className="flex p-2 ">
              <IoSearchOutline
                onClick={() => {
                  if (!isSearch) {
                    return setSearch("test");
                  }
                  return setSearch(null);
                }}
              />
              {isSearch && (
                <input
                  type="text"
                  placeholder="Search"
                  className="mx-1 outline-none text-yellow-50 bg-gray-400 font-size text-xs"
                  onChange={handleInput}
                ></input>
              )}
            </div>
          </div>
        </div>
        <hr className="border-gray-500" />
        <VideoData />
      </div>
    </div>
  );
}

export default UserSpace;
