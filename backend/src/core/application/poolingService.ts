import { PrismaClient } from "@prisma/client";
import { computePool, PoolMemberInput, PoolResult } from "../domain/pooling";

export class PoolingService {
  constructor(private prisma: PrismaClient) {}

  async createPool(year: number, members: PoolMemberInput[]) {
    const result: PoolResult = computePool(members);
    if (!result.valid) throw new Error("Invalid pool — total CB < 0");

    const created = await this.prisma.pool.create({
      data: {
        year,
        members: result.members as any,
        sumCB: result.sumCB,
      },
    });

    return created;
  }

  async getAdjustedCB(year: number) {
    return this.prisma.pool.findMany({
      where: { year },
      orderBy: { createdAt: "desc" },
    });
  }
}
