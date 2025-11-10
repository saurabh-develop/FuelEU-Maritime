import { Request, Response } from "express";
import { PoolingService } from "../../application/poolingService";

export class PoolingController {
  constructor(private service: PoolingService) {}

  adjustedCB = async (req: Request, res: Response) => {
    try {
      const year = Number(req.query.year);
      const data = await this.service.getAdjustedCB(year);
      res.json(data);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  createPool = async (req: Request, res: Response) => {
    try {
      const { year, members } = req.body;
      if (!Array.isArray(members)) throw new Error("members must be an array");
      const created = await this.service.createPool(Number(year), members);
      res.json(created);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}
