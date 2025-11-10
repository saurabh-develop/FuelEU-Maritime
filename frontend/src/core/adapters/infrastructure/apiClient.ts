import axios from "axios";
import type { Route } from "../../domain/models";

const client = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: false,
});

export const api = {
  // 🟢 ROUTES
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

  // 🟣 BANKING
  async getCB(shipId: string, year: number) {
    const res = await client.get(
      `/compliance/cb?shipId=${shipId}&year=${year}`
    );
    return res.data;
  },

  async getBankingRecords(shipId: string, year: number) {
    const res = await client.get(
      `/banking/records?shipId=${shipId}&year=${year}`
    );
    return res.data;
  },

  async bankCB(shipId: string, year: number, cb: number) {
    const res = await client.post("/banking/bank", { shipId, year, cb });
    return res.data;
  },

  async applyBankedCB(shipId: string, year: number, amount: number) {
    const res = await client.post("/banking/apply", { shipId, year, amount });
    return res.data;
  },

  async getAvailableBank(shipId: string, year: number) {
    const res = await client.get(
      `/banking/available?shipId=${shipId}&year=${year}`
    );
    return res.data;
  },

  // ⚓ POOLING
  async getAdjustedCB(year: number) {
    const res = await client.get(`/compliance/adjusted-cb?year=${year}`);
    return res.data;
  },

  async createPool(
    year: number,
    members: { shipId: string; cb_before: number }[]
  ) {
    const res = await client.post("/pools", { year, members });
    return res.data;
  },
};
