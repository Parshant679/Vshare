import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useApp";
import { deleteSearch, changeStatus } from "../../../feature/UserSlice";

function Connection({ connection, isSearch, name }) {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  async function onConnect() {
    const reqbody = {
      source: { _id: id, name: name },
      destination: { _id: connection._id, name: connection.name },
      status: 0,
    };
    const res = await axios.post(
      import.meta.env.VITE_BASE_URL + "/user/sendRequest",
      reqbody,
      {
        withCredentials: true,
      }
    );

    dispatch(deleteSearch(connection._id));
  }
  async function unFollow() {
    const res = await axios.delete(
      import.meta.env.VITE_BASE_URL +
        "/user/cancelRequest?id=" +
        connection._id,
      {
        withCredentials: true,
      }
    );

    dispatch(deleteSearch(connection._id));
  }

  async function acceptRequest() {
    const res = await axios.put(
      import.meta.env.VITE_BASE_URL +
        "/user/acceptConnectionRequest?id=" +
        connection._id,
      {
        withCredentials: true,
      }
    );
    dispatch(changeStatus(connection._id));
  }
  if (isSearch) {
    return (
      <div className="flex flex-wrap justify-between text-gray-300">
        <span>{connection.name}</span>
        {connection.connectionStatus === -1 ? (
          <button onClick={onConnect}>Connect</button>
        ) : (
          <span>Request sent Already</span>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex felx-wrap justify-between text-gray-300">
        {connection.connectionStatus === 0 ? (
          <>
            <span>{connection.user2.name}</span>
            <div>
              <button className="px-3">Pending</button>
              <button onClick={unFollow}>Cancle</button>
            </div>
          </>
        ) : (
          <button onClick={unFollow}>Unfollow</button>
        )}
        {!connection && connection.user2._id === id && (
          <>
            <span>{connection.user2.name}</span>
            <button className="px-3" onClick={acceptRequest}>
              Accept
            </button>
          </>
        )}
      </div>
    );
  }
}

export default Connection;
