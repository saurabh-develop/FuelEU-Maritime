import { Request, Response } from "express";
import { BankingService } from "../../application/bankingService";

export class BankingController {
  constructor(private service: BankingService) {}

  getRecords = async (req: Request, res: Response) => {
    try {
      const shipId = String(req.query.shipId);
      const year = Number(req.query.year);
      const data = await this.service.getRecords(shipId, year);
      res.json(data);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  getAvailable = async (req: Request, res: Response) => {
    try {
      const shipId = String(req.query.shipId);
      const year = Number(req.query.year);
      const avail = await this.service.getAvailableBank(shipId, year);
      res.json({ shipId, year, available: avail });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  bank = async (req: Request, res: Response) => {
    try {
      const { shipId, year, cb } = req.body;
      const rec = await this.service.bank(
        String(shipId),
        Number(year),
        Number(cb)
      );
      res.json(rec);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  apply = async (req: Request, res: Response) => {
    try {
      const { shipId, year, amount } = req.body;
      const rec = await this.service.apply(
        String(shipId),
        Number(year),
        Number(amount)
      );
      res.json(rec);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}
