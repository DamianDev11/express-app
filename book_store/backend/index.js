import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(220).send("Welcome to my book store");
});

app.listen(PORT, () => {
  console.log(`App is listening in PORT:${PORT}`);
});
