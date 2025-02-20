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
  TableSortLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import ActivityView from "./ActivityView";
import axios from "axios";
import dayjs from "dayjs";
import {
  Delete,
  Edit,
  FiberNew,
  Done,
  Autorenew,
  HourglassEmpty,
  PlayCircleFilled,
  AccessTime,
  Pending,
  HourglassBottom,
} from "@mui/icons-material";

const Todo = ({ useTranslation }) => {
  const [dataTodoList, setDataTodoList] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/tasks/get", {
          withCredentials: true,
        });

        setDataTodoList(result.data);
        setRows(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isChanged]);

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

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const [rows, setRows] = useState(dataTodoList);

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);

    const sortedRows = [...rows].sort((a, b) => {
      if (a[column] < b[column]) return isAsc ? -1 : 1;
      if (a[column] > b[column]) return isAsc ? 1 : -1;
      return 0;
    });

    setRows(sortedRows);
  };

  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (text) => {
    setFilterText(text);
  };

  const filteredRows = rows.filter((row) => {
    if (!filterText.trim()) return true;

    return Object.keys(row).some((key) => {
      const cellValue = row[key] ?? "";
      return cellValue
        .toString()
        .toLowerCase()
        .includes(filterText.toLowerCase());
    });
  });

  const handleDeleteClick = async (id) => {
    console.log("Delete clicked for", id);
  };

  const handleEditClick = (id) => {
    console.log("Edit clicked for", id);
  };

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
          sx={{ fontSize: "1.1rem", marginLeft: "1.2rem" }}
        >
          {useTranslation("Add Task")}
        </Button>
      </div>
      {dataTodoList.length > 0 && (
        <TableContainer component={Paper} className="activities-table">
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#9EC7EF" }}>
                <TableCell></TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "type"}
                    direction={order}
                    onClick={() => handleSort("type")}
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {useTranslation("Type")}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={order}
                    onClick={() => handleSort("name")}
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {useTranslation("Title")}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "client"}
                    direction={order}
                    onClick={() => handleSort("client")}
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {useTranslation("Client")}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "description"}
                    direction={order}
                    onClick={() => handleSort("description")}
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {useTranslation("Description")}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "start_date"}
                    direction={order}
                    onClick={() => handleSort("start_date")}
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {useTranslation("Date")}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "due_date"}
                    direction={order}
                    onClick={() => handleSort("due_date")}
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {useTranslation("Due Date")}
                  </TableSortLabel>
                </TableCell>

                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={6}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Filter Words"
                    value={filterText}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    sx={{ fontSize: "1.2rem", width: "100%" }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Tooltip title="Edit task" arrow>
                      <Edit onClick={() => handleEditClick(activity._id)} />
                    </Tooltip>
                    <Tooltip title="Delete task" arrow>
                      <Delete onClick={() => handleDeleteClick(activity._id)} />
                    </Tooltip>
                  </TableCell>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>{activity.name}</TableCell>
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
                    {dayjs(activity.start_date).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {dayjs(activity.due_date).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {activity.status === "New" && (
                      <Tooltip title="New Task" arrow>
                        <FiberNew />
                      </Tooltip>
                    )}
                    {activity.status === "Completed" && (
                      <Tooltip title="Completed" arrow>
                        <Done />
                      </Tooltip>
                    )}
                    {activity.status === "Pending" && (
                      <Tooltip title="Pending" arrow>
                        <Pending />
                      </Tooltip>
                    )}
                    {activity.status === "In Progress" && (
                      <Tooltip title="In Progress" arrow>
                        <HourglassBottom />
                      </Tooltip>
                    )}
                  </TableCell>
                  {activity.status === "New" && (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: "10px" }}
                        onClick={() => handleStartTodo(activity._id)}
                      >
                        Start
                      </Button>
                    </TableCell>
                  )}
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
        setIsChanged={setIsChanged}
      />
    </div>
  );
};

export default Todo;
