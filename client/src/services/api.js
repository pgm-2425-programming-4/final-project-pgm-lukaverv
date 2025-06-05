import { API_URL, API_TOKEN } from "../constants/constant.js";

// herbruikbare functie om data op te halen van de API
const fetchData = async (endpoint) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const json = await response.json();
  return json.data;
};

// Alle projecten ophalen
export const getProjects = () => {
  return fetchData("projects");
};

// Alle taken ophalen op basis van de task_status
export const getTaskByStatus = (taskStatus) => {
  return fetchData(
    `tasks?filters[task_status][title][$eq]=${taskStatus}&populate=*`
  );
};

// Alle statussen ophalen
export const getStatuses = () => fetchData("statuses");

// Alle labels ophalen
export const getLabels = () => fetchData("labels");

// Functie met POST request om een nieuwe taak aan te maken
export const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: taskData,
    }),
  });
  const json = await response.json();
  return json.data;
};
