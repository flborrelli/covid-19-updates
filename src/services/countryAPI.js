import axios from 'axios';

const countryAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL_ALL_CASES,
})

export default countryAPI;