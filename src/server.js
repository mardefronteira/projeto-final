import express from 'express';
import globalRoutes from './routes/globalRoutes';
import connectDB from './config/db';

import 'dotenv/config';

connectDB();


const server = express();
server.use(express.json());

server.use(globalRoutes);

server.listen(3333);