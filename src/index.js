import express from "express";
import indexRouter from "./routers/indexRouter.js";
import apiRouter from "./routers/apiRouter.js";

const app = express();

app.use(express.static("src/public"));
app.use("/", indexRouter);
app.use("/api", apiRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`App corriendo en http://127.0.0.1:${PORT}`);
});
