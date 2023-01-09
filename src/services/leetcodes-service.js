import axios from "axios";

const BASE_URL = process.env.REACT_APP_HEROKU_URL || process.env.REACT_APP_API_BASE_URL
const API = `${BASE_URL}/api/leetcodes`;

export const findAllLeetcodes = () =>
    axios.get(API)
    .then(response => response.data);

export const findLeetcodesByID = (lid) =>
    axios.get(`${API}/${lid}`)
    .then(response => response.data);

export const createLeetcode = (leetcode) =>
    axios.post(`${API}/new`, leetcode)
    .then(response => response.data);

export const updateLeetcode = (mid, leetcode) =>
    // console.log(leetcode);
    axios.put(`${API}/mongodbid/${mid}`, leetcode)
    .then(response => response.data);