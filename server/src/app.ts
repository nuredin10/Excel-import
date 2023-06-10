import express, { Application } from 'express';
import { PrismaClient } from '@prisma/client';
import dataRoutes from './routes/dataRoutes';
const cors = require('cors');


const prisma = new PrismaClient();
const app: Application = express();


app.use(express.json());
app.use(cors());


app.use('/api/data', dataRoutes(prisma));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
