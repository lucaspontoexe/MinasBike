import axios from 'axios';

const api = axios.create({
    baseURL: `http://201.46.39.22:3001/`,
    proxy: {
        host: 'backend',
        port: 3001,
        },
    });

export default api;
