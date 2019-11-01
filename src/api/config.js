import axios from 'axios';

const API = axios.create({
  // baseURL: `${process.env.NUNUNI_DOMAIN}/nununi`,
  baseURL: `${process.env.NUNUNI_DOMAIN}`,
  headers: {
    // 'Content-Type': 'application/json',
    // Authorization : `Bearer ${process.env.NUNUNI_TOKEN}`
    //Authorization : 'Bearer 0999491db0588353958f204479ee5237a74f786b'
  }
});

export default API;