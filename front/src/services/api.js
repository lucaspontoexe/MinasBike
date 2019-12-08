import axios from 'axios';

const api = axios.create({ baseURL: `http://${process.env.backend}:3001` });

export default api;
