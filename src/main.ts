import { PORT } from "@/config";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import passport from "./passport.config";
import router from "./router";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(passport.initialize());

app.use("/api", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => console.log(`server runs on :${PORT}`));
