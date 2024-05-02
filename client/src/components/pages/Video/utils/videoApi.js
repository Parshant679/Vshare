import axios from "axios";

const VideoApi = {
  getUserVidoes: async (user_Id, pageNo = 1) => {
    try {
      return await axios.get(
        import.meta.env.VITE_BASE_URL +
          `/getVideos?userId=${user_Id}&pageNo=${pageNo}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  getSingleVideoData: async (videoId) => {
    try {
      return await axios.get(
        import.meta.env.VITE_BASE_URL +
          `/getSingleVideoData?videoId=${videoId}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  updateVideoData: async (videoData) => {
    try {
      return await axios.post(
        import.meta.env.VITE_BASE_URL + `/updateVideoData?${video_Id}`,
        videoData,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  uploadVideo: async (payload) => {
    try {
      return await axios.post(
        import.meta.env.VITE_BASE_URL + "/uploadVideo",
        payload,
        {
          headers: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  deleteVideo: async (videoId, public_id) => {
    try {
      return await axios.delete(
        import.meta.env.VITE_BASE_URL +
          `/deleteVideo?videoId=${videoId}&public_id=${public_id}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  assignEditor: async (videoId, editorData) => {
    try {
      return await axios.put(
        import.meta.env.VITE_BASE_URL + `/assignEditor?videoId=${videoId}`,
        editorData,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default VideoApi;
