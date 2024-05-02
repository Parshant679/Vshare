import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import VideoApi from "../pages/Video/utils/videoApi";
import { useAppDispatch } from "../../hooks/useApp";
import { addVideos } from "../../feature/VideoSlice";

const FormDialog = ({ id }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle form submission here

    const selectedFile = new FormData();
    selectedFile.append("video", file);
    selectedFile.append("title", title);
    selectedFile.append("description", description);
    selectedFile.append("owner_Id", id);
    selectedFile.append("cloud_id", -1);
    selectedFile.append("updatedby_id", id);
    selectedFile.append("video_id", 0);

    VideoApi.uploadVideo(selectedFile)
      .then((res) => dispatch(addVideos(res.data.data)))
      .catch((err) => console.log(err));

    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>upload</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Video</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            value={title}
            onChange={handleTitleChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
          />
          <input
            // accept="image/*"
            style={{ display: "none" }}
            id="upload-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="upload-file">
            <Button variant="contained" component="span">
              Upload File
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
