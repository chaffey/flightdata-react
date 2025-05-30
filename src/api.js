// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.53:8000/api/data', // update if needed
});

export default api;
