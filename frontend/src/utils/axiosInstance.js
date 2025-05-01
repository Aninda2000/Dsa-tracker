import axios from 'axios';

const token = localStorage.getItem('token'); // Read from localStorage

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
