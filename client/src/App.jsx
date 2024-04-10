import React from "react";
import "./App.css";
import VideoCard from "./components/utils/videoCard";
import UploadVideo from "./components/uploadVideos";

function App() {
  return (
    <div>
      <VideoCard />
      <UploadVideo />
    </div>
  );
}

export default App;
