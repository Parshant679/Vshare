import React from "react";
import "./VideoData.css";
import VideoCard from "./VideoCard";
import { useAppSelector } from "../../../hooks/useApp";

function VideoData() {
  const videos = [
    { _id: 123, title: "I am not a legend", status: "Inprogress" },
    { _id: 124, title: "I am dead", status: "Inprogress" },
    { _id: 125, title: "I am Legend", status: "Inprogress" },
  ]; //useAppSelector((state) => state.videoData.Videos);
  return (
    <div className="video__grid">
      {videos.map((item) => {
        return <VideoCard data={item} key={item._id} />;
      })}
    </div>
  );
}

export default VideoData;
