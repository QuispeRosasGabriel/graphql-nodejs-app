import express from "express";
import cors from "cors";
import compression from "compression";
import { createServer } from "http";

const app = express();
app.use("*", cors());
app.use(compression());

app.get("/", (req, res) => {
  res.send("PROBANDO");
});

const httpServer = createServer(app);

httpServer.listen(
  {
    port: 3000,
  },
  () => console.log("Servidor levantado en http://localhost:3000")
);
