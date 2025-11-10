import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { prisma } from "../../../infrastructure/db/prismaClient";
import { RouteService } from "../../../core/application/routeService";
import { RouteRepoPrisma } from "../../outbound/postgres/routeRepoPrisma";
import { RouteController } from "../../../core/ports/inbound/httpHandlers";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// Hexagonal wiring
const repo = new RouteRepoPrisma(prisma);
const service = new RouteService(repo);
const controller = new RouteController(service);

// Endpoints
app.get("/routes", controller.getAll);
app.post("/routes/:id/baseline", controller.setBaseline);
app.get("/routes/comparison", controller.comparison);
app.get("/compliance/cb", controller.computeCB);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ Backend running at http://localhost:${PORT}`)
);
