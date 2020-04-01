import axios from 'axios';

const worldAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export default worldAPI;