import React, { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import ActivityView from "./ActivityView";

const Todo = ({ useTranslation }) => {
  const [dataTodoList, setDataTodoList] = useState([
    {
      id: 1,
      type: "Work",
      client: "Client 1",
      description: "Description 1",
    },
    {
      id: 2,
      type: "Personal",
      client: "Client 2",
      description: "Description 2",
    },
  ]);

  const handleStartTodo = (id) => {
    console.log("Start clicked for", id);
  };

  const handleRowClick = (activity) => {
    handleModalOpen();
  };

  /// Modal
  const [open, setOpen] = useState(false);
  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  return (
    <div className="activities-container-table">
      <h1 className="activities-table-title">
        To do - {dataTodoList.length} activities
      </h1>
      <TableContainer component={Paper} className="activities-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{useTranslation("Type")}</TableCell>
              <TableCell>{useTranslation("Client")}</TableCell>
              <TableCell>{useTranslation("Description")}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTodoList.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>{activity.type}</TableCell>
                <TableCell>{activity.client}</TableCell>
                <TableCell
                  className="activities-table-description"
                  onClick={() => {
                    handleRowClick(activity);
                  }}
                >
                  {activity.description}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleStartTodo(activity.id)}
                  >
                    Start
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
      >
        <Box className="modal-viewActivity">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {useTranslation("Activity")}
          </Typography>
          <ActivityView useTranslation={useTranslation} />
        </Box>
      </Modal>
    </div>
  );
};

export default Todo;
