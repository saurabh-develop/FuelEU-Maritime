import request from "supertest";
import express from "express";
import { prisma } from "../../infrastructure/db/prismaClient";
import { RouteRepoPrisma } from "../../adapters/outbound/postgres/routeRepoPrisma";
import { RouteService } from "../../core/application/routeService";
import { RouteController } from "../../core/ports/inbound/httpHandlers";

const app = express();
app.use(express.json());

const repo = new RouteRepoPrisma(prisma);
const service = new RouteService(repo);
const controller = new RouteController(service);

app.get("/routes", controller.getAll);

describe("GET /routes", () => {
  it("should return routes", async () => {
    const res = await request(app).get("/routes");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
