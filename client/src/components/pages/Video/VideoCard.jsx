import "./Card.css";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
} from "../../../assets/exportImage";

function getRandomImage(images) {
  const randomIndex = Math.floor(Math.random() * images);
  return randomIndex;
}

function VideoCard({ data }) {
  console.log(data);
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
  ];
  const randomImage = images[getRandomImage(images.length)];
  return (
    <div className="card">
      <img src={randomImage} alt="Placeholder Image" />
      <div className="data">
        <p className="m-1 text-gray-400 font-sans">
          Title:{data.title}
          <br />
          Assigned To:
          <br />
          Last Updated:
          <br />
          Status:{data.status}
          <br />
          %:
          <br />
        </p>
      </div>
    </div>
  );
}

export default VideoCard;
