import dotenv from 'dotenv';
import 'reflect-metadata';

import express from 'express';
import '@shared/infra/database/connect';
import cors from 'cors';
import uploadConfig from '@config/upload';
import SwaggerUi from 'swagger-ui-express';
import swaggerDocs from '../../../swagger.json';

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());
app.use("/api-doc", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));
app.use('/files', express.static(uploadConfig.directory));
//import('@shared/infra/http/routes/index').then((routes) => {app.use(routes);})

app.listen(process.env.PORT || 3000, () => console.log('Server started at http://localhost:3000/v1 or http://localhost:3000/api-doc'));
