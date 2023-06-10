import { Request, Response } from 'express';
// import { Data } from '../models/Data';
import * as DataService from '../services/DataService';

export async function getAllData(req: Request, res: Response): Promise<void> {
    try {
        const allData = await DataService.getAllData();
        res.json(allData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function createNewData(req: Request, res: Response): Promise<void> {
    try {
        const file = req.file;

        if (!file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }


        const newData = await DataService.createNewData(file);

        res.json(newData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateExistingData(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { itemNo, description, unit, rate, qty, amount } = req.body;
        const updatedData = await DataService.updateOldData(parseInt(id), {
            id: parseInt(id),
            itemNo,
            description,
            unit,
            rate,
            qty,
            amount,
        });
        res.json(updatedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteDataById(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        await DataService.deleteOldData(parseInt(id));
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
