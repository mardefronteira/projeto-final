import express from 'express';
import globalRoutes from './routes/globalRoutes';
import Mongoose from 'mongoose';
import 'dotenv/config';

const server = express();
server.use(express.json());

Mongoose.connect(process.env.DB_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

server.use(globalRoutes);

server.listen(3333);