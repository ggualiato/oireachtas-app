import axios from "axios";

export const fakeApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const oireachtasApi = axios.create({
  baseURL: "https://api.oireachtas.ie",
});
