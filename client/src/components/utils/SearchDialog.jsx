import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const FormDialog = ({ search }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleSubmit = () => {
    // Handle form submission here

    search(title);

    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Search</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search Conections</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label=""
            fullWidth
            value={title}
            onChange={handleTitleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Search</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
