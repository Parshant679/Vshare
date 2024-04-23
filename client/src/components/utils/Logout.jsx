import React from "react";
import axios from "axios";
function Logout() {
  const handlelogout = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/user/logout",
        {}
      );
      console.log(res);
      if (res.data.success) {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button
        onClick={handlelogout}
        className=" px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
