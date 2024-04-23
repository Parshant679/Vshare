import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoCloudUploadOutline } from "react-icons/io5";
import UploadVideo from "../uploadVideos";

export default function FormDialog() {
  return (
    <>
      <IoCloudUploadOutline
        className=" text-gray-400 text-3xl mt-8"
        htmlFor="file"
        type="file"
      />
    </>
  );
}
