import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";

const IndexSection = ({ useTranslation }) => {
  const [lastIndex, setLastIndex] = useState(500);
  const [currentIndex, setCurrentIndex] = useState(250);

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="IndexSection">
      <div>
        {useTranslation("lastIndexSend")}: {lastIndex}
      </div>
      <div>
        {useTranslation("currentindex")}: {currentIndex}
        <Button onClick={handleOpenModal}>
          {useTranslation("sendNewIndex")}
        </Button>
      </div>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>{useTranslation("Enter the new index")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={useTranslation("Your Index")}
            type="text"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>{useTranslation("Cancel")}</Button>
          <Button
            onClick={() => {
              //TODO - save de db
              console.log("Submitted value:", inputValue);
              setInputValue();
              handleCloseModal();
            }}
            color="primary"
          >
            {useTranslation("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IndexSection;
