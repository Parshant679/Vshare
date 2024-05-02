import React from "react";

function Connection({ connection, isSearch }) {
  if (!isSearch.empty()) {
    return (
      <div className="flex flex-wrap justify-between">
        <span>{connection.user2.name}</span>
        {connection.connectionStatus === -1 ? (
          <button>Connect</button>
        ) : (
          <button>Pending</button>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex felx-wrap justify-between">
        <span>{connection.user2.name}</span>
        <button>Remove from Connection</button>
      </div>
    );
  }
}

export default Connection;
