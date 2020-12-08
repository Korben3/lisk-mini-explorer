import { node } from "../config/config.json";
import axios from "axios";

export const fetchForgerStats = () =>
  axios
    .get(node + "/api/forgers?limit=3")
    .then(res => res.data.data)
    .catch(err => {
      console.error(err);
      return [];
    });

export const fetchNodeInfo = () =>
  axios
    .get(node + "/api/node/info")
    .then(res => res.data.data)
    .catch(err => {
      console.error(err);
      return null;
    });

export const fetchDelegates = () =>
  axios
    .get(node + "/api/delegates?limit=1000")
    .then(res => res.data.data)
    .catch(err => {
      console.error(err);
      return [];
    });
