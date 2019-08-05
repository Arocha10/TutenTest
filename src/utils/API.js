import axios from "axios";

/*export default axios.create({
  baseURL: "https://dev.tuten.cl/TutenREST/#!",
  headers: {
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    accept: "application/json",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Content-Type": "application/json"
  },
  responseType: "json"
});*/

export default axios.create({
  baseURL: "https://dev.tuten.cl:443/TutenREST",
  timeout: 10000,
  transformRequest: [data => JSON.stringify(data.data)],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    password: "1234",
    app: "APP_BCK"
  }
});
