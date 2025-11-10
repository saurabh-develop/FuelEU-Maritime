import { PrismaClient } from "@prisma/client";
import { canApply, canBank } from "../domain/banking";

/**
 * BankingService: records banking (surplus stored) and applies stored surplus to deficits.
 * Uses Prisma directly for simplicity (keeps hexagonal separation at service/controller boundary).
 */
export class BankingService {
  constructor(private prisma: PrismaClient) {}

  async getRecords(shipId: string, year: number) {
    return this.prisma.bankingRecord.findMany({
      where: { shipId, year },
      orderBy: { createdAt: "desc" },
    });
  }

  async getAvailableBank(shipId: string, year: number) {
    const banked = await this.prisma.bankingRecord.aggregate({
      where: { shipId, year, type: "BANK" },
      _sum: { amount: true },
    });
    const applied = await this.prisma.bankingRecord.aggregate({
      where: { shipId, year, type: "APPLY" },
      _sum: { amount: true },
    });

    const bankedSum = banked._sum.amount ?? 0;
    const appliedSum = applied._sum.amount ?? 0;
    return bankedSum - appliedSum;
  }

  async bank(shipId: string, year: number, cb: number) {
    if (!canBank(cb)) throw new Error("Cannot bank non-positive CB");
    const rec = await this.prisma.bankingRecord.create({
      data: { shipId, year, amount: cb, type: "BANK" },
    });
    return rec;
  }

  async apply(shipId: string, year: number, amount: number) {
    const available = await this.getAvailableBank(shipId, year);
    if (!canApply(available, amount))
      throw new Error(`Insufficient banked CB. Available: ${available}`);
    const rec = await this.prisma.bankingRecord.create({
      data: { shipId, year, amount, type: "APPLY" },
    });
    return rec;
  }
}
