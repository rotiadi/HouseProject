import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import Utility from "../utilities/Utility";

const IndexSection = ({ useTranslation }) => {
  const [lastIndex, setLastIndex] = useState(500);
  const [currentIndex, setCurrentIndex] = useState(250);

  const [modalOpen, setModalOpen] = useState(false);
  const [graphDate, setGraphDate] = useState([
    { name: "Jan", value: 100 },
    { name: "Feb", value: 125 },
    { name: "Mar", value: 195 },
    { name: "Apr", value: 745 },
    { name: "May", value: 815 },
    { name: "Jun", value: 123 },
    { name: "Jul", value: 234 },
    { name: "Aug", value: 567 },
    { name: "Sep", value: 789 },
    { name: "Oct", value: 345 },
    { name: "Nov", value: 123 },
    { name: "Dec", value: 678 },
  ]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="ValuesSection">
      <div>
        <div>
          {useTranslation("lastIndexSend")}: {lastIndex}
        </div>
        <div>
          {useTranslation("currentindex")}: {currentIndex}
          <Button onClick={handleOpenModal}>
            {useTranslation("sendNewIndex")}
          </Button>
        </div>
      </div>
      <Utility
        useTranslation={useTranslation}
        graphType="Bar"
        graphDate={graphDate}
      />
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
