import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";

import React, { useState } from "react";

import "./Activities.css";
import axios from "axios";

const ActivityView = ({
  useTranslation,
  open,
  handleClose,
  mode,
  task,
  setTask,
  setIsChanged,
}) => {
  const handleTypeChenge = (event) => {
    setTask({ ...task, type: event.target.value });
  };

  const handleStatusChange = (event) => {
    setTask({ ...task, status: event.target.value });
  };

  const handleDateChange = (date) => {
    setTask({ ...task, startDate: dayjs(date).format("DD-MM-YYYY") });
  };

  const handleDueDateChange = (date) => {
    setTask({ ...task, dueDate: dayjs(date).format("DD-MM-YYYY") });
  };

  const handleSave = () => {
    if (mode === "add") {
      setTask({
        ...task,
        status: "New",
        startDate: dayjs().format("DD-MM-YYYY"),
      });

      axios
        .post("http://localhost:5000/tasks/add", task, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("The task was saved successfully");
          setIsChanged(true);
          handleClose();
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } else {
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContentText>
        {mode === "add" ? "Enter new task!" : "Edit the task!"}
      </DialogContentText>
      <Box className="task-dialog">
        <FormControl>
          <TextField
            required
            id="name"
            name="name"
            label="Task name"
            type="text"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          ></TextField>
        </FormControl>
        <FormControl>
          <TextField
            id="description"
            name="description"
            label="Description"
            type="text"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          ></TextField>
        </FormControl>
        <FormControl>
          <InputLabel id="label-type">Type</InputLabel>
          <Select
            required
            labelId="label-type"
            id="type"
            value={task.type}
            label="Type"
            onChange={handleTypeChenge}
          >
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            id="client"
            name="client"
            label="Client"
            value={task.client}
            onChange={(e) => setTask({ ...task, client: e.target.value })}
          ></TextField>
        </FormControl>
        {mode !== "add" && (
          <FormControl>
            <InputLabel id="label-Status">Status</InputLabel>
            <Select
              required
              labelId="label-Status"
              id="status"
              name="status"
              label="Status"
              value={task.status}
              onChange={handleStatusChange}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        )}
        {mode !== "add" && (
          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Enter a start date"
                name="startDate"
                id="startDate"
                value={dayjs(task.startDate)}
                onChange={handleDateChange}
                format="DD-MM-YYYY"
                required
              />
            </LocalizationProvider>
          </FormControl>
        )}
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Enter a due date"
              name="dueDate"
              id="dueDate"
              value={dayjs(task.dueDate)}
              onChange={handleDueDateChange}
              format="DD-MM-YYYY"
              required
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
      <DialogActions>
        <Button onClick={handleSave}>{useTranslation("Save")}</Button>
        <Button onClick={handleClose}>{useTranslation("Cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityView;
