import React, { useEffect, useState } from "react";
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
import ActivityView from "./ActivityView";
import axios from "axios";

const Todo = ({ useTranslation }) => {
  const [dataTodoList, setDataTodoList] = useState([]);

  useEffect(() => {
    console.log("Fetching data");

    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/tasks/get", {
          withCredentials: true,
        });
        setDataTodoList(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  /*  const [dataTodoList, setDataTodoList] = useState([
    {
      id: 1,
      name: "Task 1",
      type: "Work",
      client: "Client 1",
      description: "Description 1",
      status: "Pending",
      startDate: "01/30/2025",
      dueDate: "01/30/2025",
    },
    {
      id: 2,
      name: "Task 2",
      type: "Personal",
      client: "Client 2",
      description: "Description 2",
      status: "In Progress",
    },
  ]); */

  const [task, setTask] = useState({
    id: 0,
    type: "",
    client: "",
    description: "",
    status: "",
    startDate: new Date(),
  });

  const handleStartTodo = (id) => {
    console.log("Start clicked for", id);
  };

  const handleRowClick = (activity) => {
    setMode("edit");
    setOpen(true);
    setTask(activity);
  };

  // Dialog
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTaskClick = () => {
    setTask({
      type: "",
      client: "",
      description: "",
      status: "",
      startDate: new Date(),
    });
    setMode("add");
    setOpen(true);
  };

  const [mode, setMode] = useState("add");

  return (
    <div className="activities-container-table">
      <h1 className="activities-table-title">
        To do - {dataTodoList.length} activities
      </h1>
      <div className="activities-table-buttons">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTaskClick}
        >
          {useTranslation("Add Task")}
        </Button>
      </div>
      {dataTodoList.length > 0 && (
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
      )}
      <ActivityView
        useTranslation={useTranslation}
        open={open}
        handleClose={handleClose}
        mode={mode}
        task={task}
        setTask={setTask}
      />
    </div>
  );
};

export default Todo;
