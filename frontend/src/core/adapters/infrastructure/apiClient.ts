import axios from "axios";
import type { Route } from "../../domain/models";

const client = axios.create({
  baseURL: "http://localhost:4000",
});

export const api = {
  async getRoutes(params?: Record<string, any>): Promise<Route[]> {
    const res = await client.get("/routes", { params });
    return res.data;
  },
  async setBaseline(id: number) {
    await client.post(`/routes/${id}/baseline`);
  },
  async getComparison() {
    const res = await client.get("/routes/comparison");
    return res.data;
  },
};
