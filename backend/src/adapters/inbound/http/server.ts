// src/adapters/inbound/http/server.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { prisma } from "../../../infrastructure/db/prismaClient";
import { RouteService } from "../../../core/application/routeService";
import { RouteRepoPrisma } from "../../outbound/postgres/routeRepoPrisma";
import { RouteController } from "../../../core/ports/inbound/httpHandlers";
import { BankingService } from "../../../core/application/bankingService";
import { BankingController } from "../../../core/ports/inbound/bankingController";
import { PoolingService } from "../../../core/application/poolingService";
import { PoolingController } from "../../../core/ports/inbound/poolingController";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);
app.use(bodyParser.json());

// Hexagonal wiring - routes
const repo = new RouteRepoPrisma(prisma);
const routeService = new RouteService(repo);
const routeController = new RouteController(routeService);

// Banking & Pooling wiring
const bankingService = new BankingService(prisma);
const bankingController = new BankingController(bankingService);

const poolingService = new PoolingService(prisma);
const poolingController = new PoolingController(poolingService);

// Endpoints
app.get("/routes", routeController.getAll);
app.post("/routes/:id/baseline", routeController.setBaseline);
app.get("/routes/comparison", routeController.comparison);
app.get("/compliance/cb", routeController.computeCB);

// Banking endpoints
app.get("/banking/records", bankingController.getRecords);
app.get("/banking/available", bankingController.getAvailable);
app.post("/banking/bank", bankingController.bank);
app.post("/banking/apply", bankingController.apply);

// Pooling endpoints
app.get("/compliance/adjusted-cb", poolingController.adjustedCB);
app.post("/pools", poolingController.createPool);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ Backend running at http://localhost:${PORT}`)
);
