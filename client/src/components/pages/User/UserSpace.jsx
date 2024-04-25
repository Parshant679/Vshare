import React, { useEffect, useState } from "react";
import "./UserSpace.css";
import { useLocation, useNavigate } from "react-router-dom";
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
import { addVidoes } from "../../../feature/VideoSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/useApp";
import VideoApi from "../Video/utils/videoApi";

function UserSpace() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user_Id = useLocation().state;

  // setting filters for vidoes
  const [pageNo, setPageNo] = useState(1);
  const [filters, setfilters] = useState({
    status: -1,
    sort: "Desc",
    searchText: "",
  });

  // video api calls
  //

  // useEffect(() => {
  //   const res =  VideoApi.getUserVidoes(user_Id,pageNo);
  //   dispatch(addVidoes(res.data));
  // }, [pageNo]);
  const videos = []; //useAppSelector((state) => state.youtubeData.Videos);

  // handeling filters

  function handleStatus(statusType) {
    if (statusType === 1) {
      setfilters({ ...filters, status: 1 });
    } else if (statusType === 0) {
      {
        setfilters({ ...filters, status: 0 });
      }
    } else {
      setfilters({ ...filters, status: -1 });
    }
  }

  function handleSort() {
    if (filters.sort === "Desc") {
      setfilters({ ...filters, sort: "asce" });
    } else {
      setfilters({ ...filters, sort: "Desc" });
    }
  }

  function handleInput(e) {}

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
        <div>
          <h2
            className="text-yellow-400 m-4 cursor-pointer "
            onClick={() => navigate("/userProfile/" + user_Id)}
          >
            {" "}
            back to Profile
          </h2>
        </div>
        <div className="flex flex-wrap mt-10 justify-between">
          <div className="text-12 font-bold  flex flex-wrap cursor-pointer text-gray-400 ">
            <div
              className="flex flex-wrap p-2 "
              onClick={() => {
                handleStatus(-1);
              }}
              name="-1"
            >
              <MdOutlineAssignmentLate className="m-1" />
              <h2>Not Assigned</h2>
            </div>
            <div
              className="flex flex-wrap p-2 "
              onClick={() => {
                handleStatus(0);
              }}
              name="0"
            >
              <GrInProgress className="m-1" />
              <h2>In Progress</h2>
            </div>
            <div
              className="flex flex-wrap p-2 "
              onClick={() => {
                handleStatus(1);
              }}
              name="1"
            >
              <MdOutlineIncompleteCircle className="m-1" />
              <h2>Completed</h2>
            </div>
          </div>
          <div className="flex flex-wrap cursor-pointer text-gray-400 p-2">
            <div className="p-2 ">
              <VscListFilter
                onClick={() => {
                  setFiltes;
                }}
              />
            </div>
            <div className="p-2 " onClick={handleSort}>
              {filters.sort === "asce" ? (
                <FaSortAmountUp />
              ) : (
                <FaSortAmountDownAlt />
              )}
            </div>
            <div className="flex p-2 ">
              <IoSearchOutline />
              {filters.searchText && (
                <input
                  type="text"
                  placeholder="Search"
                  className="mx-1 outline-none text-yellow-50 bg-gray-400 font-size text-xs"
                ></input>
              )}
            </div>
          </div>
        </div>
        <hr className="border-gray-500" />
        <VideoData item={videos} filters={filters} />
      </div>
    </div>
  );
}

export default UserSpace;
