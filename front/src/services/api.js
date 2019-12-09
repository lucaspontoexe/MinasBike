import axios from 'axios';
require('dotenv').config();

const api = axios.create({
    baseURL: `http://localhost:3001`,
    proxy: {
        host: '172.23.0.3',
        port: 3001,
        },
    });

export default api;
