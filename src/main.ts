import bodyParser from "body-parser";
import express from "express";

import { PORT } from "@/config";
import cors from "cors";
import passport from "./passport.config";
import router from "./router";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/api", router);

app.listen(PORT, () => console.log(`server runs on :${PORT}`));
