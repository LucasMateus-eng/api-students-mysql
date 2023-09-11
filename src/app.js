import express from "express";
import routes from "./routes/studentRoutes.js";

const app = express();

app.use(express.json());
app.use("/api", routes);

export default app;
