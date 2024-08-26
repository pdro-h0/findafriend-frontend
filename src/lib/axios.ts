import axios from "axios";

export const api = axios.create({
  baseURL: "https://findafriend-api-tyio.onrender.com",
});
