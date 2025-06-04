import { API_URL, API_TOKEN } from "../constants/constant.js";

const fetchData = async (endpoint) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        }
    });
    const json = await response.json();
    return json.data;
};

export const getProjects = () => {
    return fetchData("projects");
}

export const getTaskByStatus = (taskStatus) => {
    return fetchData(`tasks?filters[task_status][title][$eq]=${taskStatus}&populate=*`);
}