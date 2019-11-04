import axios from 'axios';

const API = axios.create({
  // baseURL: `${process.env.NUNUNI_DOMAIN}/nununi`,
  baseURL: `${process.env.NUNUNI_DOMAIN}`,
  headers: {
    // 'Content-Type': 'application/json',
    // Authorization : `Bearer ${process.env.NUNUNI_TOKEN}`
  }
});

export default API;