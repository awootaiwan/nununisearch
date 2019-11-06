import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.NUNUNI_DOMAIN}`,
  headers: {}
});

export default API;
