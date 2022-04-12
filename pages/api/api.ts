import axios from "axios";

const api = axios.create({
  baseURL: 'https://wine-back-test.herokuapp.com/',
});

export default api;