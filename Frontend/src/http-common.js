import axios from "axios";

export default axios.create({
  //   baseURL: "http://localhost:8080",
  baseURL: "http://ec2-3-143-248-67.us-east-2.compute.amazonaws.com:8080/",
  headers: {
    "Content-type": "application/json",
  },
});
