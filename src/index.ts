import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import apiRouter from "./common/router/api.router";

dotenv.config(); // tidak berada di dalam if

console.log('dirname', __dirname)


console.log("NODE_ENV:", process.env.NODE_ENV);

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api", apiRouter)

app.get('', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("kunaon");
  } catch (error) {
    next(error);
  }
});



app.listen(port, () => {
  console.log("Server is running on port", port);
});