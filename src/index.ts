import 'reflect-metadata';

import express from 'express';
import routes from './routes/index';
import cors from 'cors';
import SwaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

import './database/connect';

const app = express();

app.use(express.json());

app.use("/api-doc", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));

app.use(routes);
app.use(cors())

app.listen(3000, () => console.log('Server started at http://localhost:3000'));

