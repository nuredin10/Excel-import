import { PrismaClient, Data as PrismaData } from '@prisma/client';

const prisma = new PrismaClient();

export interface Data extends PrismaData {}

export async function createData(data: PrismaData): Promise<Data> {
    const createdData = await prisma.data.create({ data });
    return createdData;
}

export async function getData(): Promise<Data[]> {
    const allData = await prisma.data.findMany();
    return allData;
}

export async function updateData(
    id: number,
    data: PrismaData
): Promise<Data | null> {
    const updatedData = await prisma.data.update({
        where: { id },
        data,
    });
    return updatedData;
}

export async function deleteData(id: number): Promise<boolean> {
    await prisma.data.delete({
        where: { id },
    });
    return true;
}
