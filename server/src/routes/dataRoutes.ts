import { Router } from 'express';
import * as DataController from '../controllers/DataController';
import { PrismaClient } from '@prisma/client';
import {upload} from '../middleware/uploadMiddleware';

const router = Router();

const dataRoutes = (prisma: PrismaClient) => {
    router.get('/', DataController.getAllData);
    router.post('/', upload.single('file'),DataController.createNewData);
    router.put('/:id', DataController.updateExistingData);
    router.delete('/:id', DataController.deleteDataById);

    return router;
};

export default dataRoutes;
