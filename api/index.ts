import express from "express";
import cors from "cors";
import path from "path";
import type { CorsOptions } from "cors";
import { routerApi } from "./routes/index";
import { logErrors, errorHandler } from "./middlewares/error.handler";
import { boomErrorHandler } from "./middlewares/error.handler";
type OriginCallback = (error: Error | null, success: boolean) => void;

const app = express();
const port = process.env.PORT || 3000;

//to accept post
app.use(express.json());
//cors
const whitelist = ["http://localhost:3000"];
const options: CorsOptions = {
  origin: (origin: string | undefined, callback: OriginCallback) => {
    if (origin && whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Access not permitted"), false);
    }
  },
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/api", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("my port" + port);
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(cors(options));
