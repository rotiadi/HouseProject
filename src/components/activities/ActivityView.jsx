import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

import React, { useEffect, useState, useMemo } from "react";

const ActivityView = ({ useTranslation }) => {
  const [type, setType] = useState("");
  const [client, setClient] = useState("");
  const [clientList, setClientList] = useState([]);
  const [description, setDescription] = useState("");

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleClientChange = (event) => {
    setClient(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSaveClick = () => {
    console.log(type, client, description);
  };

  useEffect(() => {
    setClientList(["Client 1", "Client 2"]);
  }, []);

  return (
    <div>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="type-label>">{useTranslation("Type")}</InputLabel>
          <Select
            labelId="type-label"
            id="typr"
            value={type}
            onChange={handleTypeChange}
          >
            <MenuItem value="">
              <em> </em>
            </MenuItem>
            <MenuItem value="Personal">{useTranslation("Personal")}</MenuItem>
            <MenuItem value="Work">{useTranslation("Work")}</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="client-label">{useTranslation("Client")}</InputLabel>
          <Select
            labelId="client-label"
            id="client"
            value={client}
            onChange={handleClientChange}
          >
            <MenuItem value="">
              <em> </em>
            </MenuItem>
            {clientList.map((client) => (
              <MenuItem key={client} value={client}>
                {client}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <TextField
            id="description"
            label={useTranslation("Description")}
            variant="standard"
            rows={5}
            multiline
            onChange={handleDescriptionChange}
          ></TextField>
          <Button variant="contained" onClick={handleSaveClick}>
            {useTranslation("Save")}
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default ActivityView;
