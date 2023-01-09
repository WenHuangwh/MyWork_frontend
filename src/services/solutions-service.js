import axios from "axios";

const BASE_URL = process.env.REACT_APP_HEROKU_URL || process.env.REACT_APP_API_BASE_URL
const API = `${BASE_URL}/api`;

export const findAllSolutions = () =>
    axios.get(`${API}/solutions`)
    .then(response => response.data);

export const findSolutionsByLid = (lid) =>
    axios.get(`${API}/leetcodes/${lid}/solution`)
    .then(response => response.data);

export const createSolution = (solution) =>
    axios.post(`${API}/solutions/new`, solution)
    .then(response => response.data);

export const updateSolution = (sid, solution) =>
    axios.put(`${API}/solutions/${sid}`, solution)
    .then(response => response.data);