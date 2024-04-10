import React, { useState } from "react";
import axios from "axios";

function UploadVideo() {
  const [video, setVideo] = useState(null);
  async function handelSubmit(e) {
    e.preventDefault();
    const selectedFile = new FormData();
    selectedFile.append("video", video);
    console.log(selectedFile);
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/uploadVideo",
        selectedFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <form onSubmit={handelSubmit}>
      <input
        type="file"
        name="video"
        placeholder="choose video"
        onChange={(e) => {
          return setVideo(e.target.files[0]);
        }}
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadVideo;
