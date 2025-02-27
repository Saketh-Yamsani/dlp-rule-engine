import axios from "axios";

const API_URL = "/api/rules";  // No need for localhost in production

// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// API Calls
export const getRules = async () => {
  try {
    return await axios.get(API_URL, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("Error fetching rules:", error);
  }
};

export const createRule = async (rule) => {
  try {
    return await axios.post(API_URL, rule, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("Error creating rule:", error);
  }
};

export const updateRule = async (id, rule) => {
  try {
    return await axios.put(`${API_URL}/${id}`, rule, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("Error updating rule:", error);
  }
};

export const deleteRule = async (id) => {
  try {
    return await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("Error deleting rule:", error);
  }
};
