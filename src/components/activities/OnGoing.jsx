import React, { useState, useEffect } from "react";
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

const OnGoing = ({ useTranslation }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setDataActivities((prevData) =>
        prevData.map((row) => ({
          ...row,
          timeConsumed: calculateTimeConsumed(row.startDate, row.endDate),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [dataActivities, setDataActivities] = useState([
    {
      id: 1,
      type: "Work",
      client: "Client 1",
      description: "Description 1",
      startDate: "02-13-2025 09:00",
      endDate: "",
      timeConsumed: "",
      status: "Started",
    },
    {
      id: 2,
      type: "Personal",
      client: "Client 2",
      description: "Description 2",
      startDate: "",
      endDate: "",
      timeConsumed: "",
      status: "On going",
    },
  ]);

  const calculateTimeConsumed = (startDate, endDate) => {
    if (!startDate) return "-";
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffInMs = end - start;
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleStart = (activity) => {
    activity.startDate = new Date().toLocaleString();
    console.log("Start clicked for", activity);
  };

  const handleEnd = (activity) => {
    console.log("End clicked for", activity);
  };
  const handlePause = (activity) => {
    console.log("Pause clicked for", activity);
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
    <div>
      <div className="activities-container-table">
        <h1 className="activities-table-title">
          On going - {dataActivities.length} activities
        </h1>
        <TableContainer component={Paper} className="activities-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{useTranslation("Type")}</TableCell>
                <TableCell>{useTranslation("Client")}</TableCell>
                <TableCell>{useTranslation("Description")}</TableCell>
                <TableCell>{useTranslation("Start Date")}</TableCell>
                <TableCell>{useTranslation("End Date")}</TableCell>
                <TableCell>{useTranslation("Time consumed")}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataActivities.map((activity, index) => (
                <TableRow
                  key={index}
                  style={{
                    animation: activity.startDate
                      ? "flicker 2s infinite"
                      : "none",
                  }}
                >
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
                  <TableCell>{activity.startDate}</TableCell>
                  <TableCell>{activity.endDate}</TableCell>
                  <TableCell>{activity.timeConsumed}</TableCell>
                  <TableCell>
                    {activity.startDate ? (
                      <>
                        <Button
                          onClick={() => handleEnd(activity)}
                          variant="contained"
                          color="primary"
                          style={{ marginLeft: "10px" }}
                        >
                          End
                        </Button>
                        <Button
                          onClick={() => handlePause(activity)}
                          variant="contained"
                          color="primary"
                          style={{ marginLeft: "10px" }}
                        >
                          Pause
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => handleStart(activity)}
                        variant="contained"
                        color="primary"
                      >
                        Start
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <style>
            {`
          @keyframes flicker {
            0% { background-color: rgba(255, 255, 0, 0.5); }
            100% { background-color: transparent; }
          }
        `}
          </style>
        </TableContainer>
      </div>

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

export default OnGoing;
