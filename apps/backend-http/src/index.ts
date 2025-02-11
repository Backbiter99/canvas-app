import express from "express";
import appRouter from "./routes";

const app = express();

app.use(express.json());
app.use("/api/v1", appRouter);

app.listen(4000);
