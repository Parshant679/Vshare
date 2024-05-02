import "./Card.css";
import { status } from "../../utils/enum";
// import {
//   image1,
//   image2,
//   image3,
//   image4,
//   image5,
//   image6,
//   image7,
//   image8,
//   image9,
// } from "../../../assets/exportImage";
import { MdOutlineDeleteOutline } from "react-icons/md";
import VideoApi from "./utils/videoApi";
import { useAppDispatch } from "../../../hooks/useApp";
import { deleteVideos } from "../../../feature/VideoSlice";

// function getRandomImage(images) {
//   const randomIndex = Math.floor(Math.random() * images);
//   return randomIndex;
// }

function VideoCard({ data }) {
  const dispatch = useAppDispatch();
  // const images = [
  //   image1,
  //   image2,
  //   image3,
  //   image4,
  //   image5,
  //   image6,
  //   image7,
  //   image8,
  //   image9,
  // ];
  // const randomImage = images[getRandomImage(images.length)];

  function handleDelete() {
    VideoApi.deleteVideo(data._id, data.public_id)
      .then((res) => dispatch(deleteVideos(data._id)))
      .catch((err) => console.log(err));
  }
  return (
    <div className="card">
      <iframe src={data.imageUrl}></iframe>
      {/* <img src={data.imageUrl} alt="Placeholder Image" /> */}
      <div className="data flex flex-wrap justify-between">
        <p className="m-1 text-gray-400 font-sans">
          Title:{data.title}
          <br />
          Assigned To:
          <br />
          Last Updated: {data.updatedAt}
          <br />
          Status:{status.get(data.status)}
          <br />
          %:
          <br />
        </p>
        <MdOutlineDeleteOutline
          className="mt-auto  size-5 text-gray-400 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default VideoCard;
