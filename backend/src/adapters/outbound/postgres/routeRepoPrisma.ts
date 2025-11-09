import { PrismaClient } from "@prisma/client";
import { RouteRepository } from "../../../core/ports/outbound/routeRepo";
import { Route } from "../../../core/domain/route";

export class RouteRepoPrisma implements RouteRepository {
  constructor(private prisma: PrismaClient) {}

  async getAll(): Promise<Route[]> {
    return this.prisma.route.findMany();
  }

  async getBaseline(): Promise<Route | null> {
    return this.prisma.route.findFirst({ where: { isBaseline: true } });
  }

  async getNonBaseline(): Promise<Route[]> {
    return this.prisma.route.findMany({ where: { isBaseline: false } });
  }

  async resetBaseline(): Promise<void> {
    await this.prisma.route.updateMany({ data: { isBaseline: false } });
  }

  async updateBaseline(id: number): Promise<Route> {
    return this.prisma.route.update({
      where: { id },
      data: { isBaseline: true },
    });
  }

  async getByRouteId(routeId: string): Promise<Route | null> {
    return this.prisma.route.findUnique({ where: { routeId } });
  }
}
