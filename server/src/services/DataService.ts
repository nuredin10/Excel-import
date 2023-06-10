import { Data, createData, getData, updateData, deleteData } from '../models/data';
import { parseExcel } from '../utils/excelUtils';
import { PrismaClient, Data as PrismaData } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllData(): Promise<Data[]> {
    const allData = await getData();
    return allData;
}


export async function createNewData(file: Express.Multer.File): Promise<PrismaData[]> {
    const parsedData = await parseExcel(file.path); // Pass the file path to parseExcel

    await prisma.data.createMany({
        data: parsedData,
        skipDuplicates: true,
    });

    const createdData = await prisma.data.findMany();

    return createdData;
}


export async function updateOldData(id: number, data: Data): Promise<Data | null> {
    const updatedData = await updateData(id, data);
    return updatedData;
}

export async function deleteOldData(id: number): Promise<boolean> {
    const success = await deleteData(id);
    return success;
}
