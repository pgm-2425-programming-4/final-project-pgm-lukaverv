import { API_URL, API_TOKEN } from "../constants/constant.js";

// herbruikbare functie om data op te halen van de API
const fetchData = async (endpoint) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const json = await response.json();
  return json;
};

// Alle projecten ophalen
export const getProjects = () => {
  return fetchData("projects");
};

// Een specifiek project ophalen op basis van de projectId
export const getProjectByDocumentId = (documentId) => {
  return fetchData(
    `projects?filters[documentId][$eq]=${documentId}&populate=*`,
  );
};

// Alle taken ophalen op basis van de task_status
export const getTaskByStatus = (taskStatus) => {
  return fetchData(
    `tasks?filters[task_status][title][$eq]=${taskStatus}&populate=*`,
  );
};

// Alle taken ophalen op basis van het documentId van het project
export const getTasksByProjectDocumentId = (documentId) => {
  return fetchData(
    `tasks?filters[project][documentId][$eq]=${documentId}&populate=*`,
  );
};

// Alle taken ophalen op basis van het documentId van het project met paginering
export const getBacklogTasksByProjectDocumentId = (
  documentId,
  start = 0,
  limit = 10,
) => {
  return fetchData (
    `tasks?filters[task_status][title][$eq]=Backlog&filters[project][documentId][$eq]=${documentId}&pagination[start]=${start}&pagination[limit]=${limit}&populate=*`,
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
  return json;
};

// Functie met PATCH request om een taak bij te werken
export const updateTaskStatus = async (taskId, statusId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        task_status: statusId,
      },
    }),
  });
  const json = await response.json();
  return json;
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    }
  });
  if (response.status === 200) {
    return await response.json();
  }
  return true;
};