import { APIClient } from "@liskhq/lisk-api-client";
import { nodes } from "../config/config.json";

const client = new APIClient(nodes);

export const fetchDelegates = () =>
  client.delegates
    .get({
      limit: 103,
      sort: "totalVotesReceived:desc",
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return [];
    });

export const fetchForgerStats = () =>
  client.delegates
    .getForgers({
      limit: 3,
    })
    .catch(err => {
      console.log(err);
      return null;
    });
