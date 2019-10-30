import axios from 'axios';

const API = axios.create({
  // baseURL: `${process.env.NUNUNI_DOMAIN}/nununi`,
  baseURL: 'http://minerva.chase.awoo.org/search/v1/1177060613/products',
  headers: {
    'Content-Type': 'application/json',
    // Authorization : `Bearer ${process.env.NUNUNI_TOKEN}`
    Authorization : 'Bearer 0999491db0588353958f204479ee5237a74f786b'
  }
});

export default API;
