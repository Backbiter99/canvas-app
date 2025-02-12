import { PrismaClient } from "@prisma/client";

const prismaClient = () => {
    return new PrismaClient();
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClient>;
}

const prisma = globalThis.prisma ?? prismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
