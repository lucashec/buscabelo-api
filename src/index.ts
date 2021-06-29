import 'reflect-metadata';

import express from 'express';
import routes from './routes/index';
import cors from 'cors';

import './database/connect';

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors())

app.listen(3000, () => console.log('Server started at http://localhost:3000'));

