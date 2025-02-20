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
} from "@mui/material";

import axios from "axios";
import dayjs from "dayjs";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/tasks/get/?status=Pending",
          {
            withCredentials: true,
          }
        );

        setDataActivities(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [dataActivities, setDataActivities] = useState([]);

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
                <TableCell>{useTranslation("Creation Date")}</TableCell>
                <TableCell>{useTranslation("Due Date")}</TableCell>
                <TableCell>{useTranslation("Time consumed")}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataActivities.map((activity, index) => (
                <TableRow
                  key={index}
                  style={{
                    animation: activity.start_date
                      ? "flicker 2s infinite"
                      : "none",
                  }}
                >
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>{activity.client}</TableCell>
                  <TableCell className="activities-table-description">
                    {activity.description}
                  </TableCell>
                  <TableCell>
                    {dayjs(activity.start_date).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {dayjs(activity.due_date).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{activity.timeConsumed}</TableCell>
                  <TableCell>
                    {activity.start_date ? (
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
    </div>
  );
};

export default OnGoing;
