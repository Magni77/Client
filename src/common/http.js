import axios from 'axios';


export const http = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem('token');
if (token) { http.defaults.headers.common.Authorization = `jwt ${token}`; }

