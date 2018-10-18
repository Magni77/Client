import axios from 'axios';


export const http = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    // 'Authorization': 'jwt ${token}'
  },
});
const token = localStorage.getItem('token');
if (token)
  http.defaults.headers.common['Authorization'] = 'jwt ' + token;

// http.defaults.headers.post['Content-Type'] = 'application/json';
