import axios from 'axios';

const api = axios.create({
    baseURL: `http://minasbike.devsio.com.br:3001`,
    proxy: {
        host: 'backend',
        port: 3001,
        },
    });

export default api;
