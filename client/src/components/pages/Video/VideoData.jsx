import React from "react";
import "./VideoData.css";
import VideoCard from "./VideoCard";
import { useAppSelector } from "../../../hooks/useApp";

function VideoData({ filters }) {
  const videos = useAppSelector((state) => state.videoData.Videos).filter(
    (item) => {
      if (
        (filters.status === 1 || filters.status === 0) &&
        filters.status === item.status
      ) {
        return item;
      } else if (filters.status === -1) {
        return item;
      }
    }
  );

  if (filters.sort === "Desc") {
    videos.sort((a, b) => a.updatedAt > b.updatedAt);
  } else {
    videos.sort((a, b) => a.updatedAt < b.updatedAt);
  }
  return (
    <div className="video__grid">
      {videos.map((item) => {
        return <VideoCard data={item} key={item._id} />;
      })}
    </div>
  );
}

export default VideoData;
