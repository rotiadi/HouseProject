import axios from "axios";

const apiURL = "http://localhost:5000";

const fetchAllTaskOfUser = async () => {
  try {
    const response = await axios.get(apiURL + "/tasks/get", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export { fetchAllTaskOfUser };
