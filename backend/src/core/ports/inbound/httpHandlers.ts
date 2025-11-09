import { Request, Response } from "express";
import { RouteService } from "../../application/routeService";

export class RouteController {
  constructor(private routeService: RouteService) {}

  getAll = async (req: Request, res: Response) => {
    const routes = await this.routeService.listRoutes();
    res.json(routes);
  };

  setBaseline = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = await this.routeService.setBaseline(id);
    res.json(updated);
  };

  comparison = async (req: Request, res: Response) => {
    const data = await this.routeService.getComparison();
    res.json(data);
  };

  computeCB = async (req: Request, res: Response) => {
    const { routeId } = req.query;
    const cb = await this.routeService.computeCB(String(routeId));
    res.json({ routeId, cb_tCO2: cb });
  };
}
