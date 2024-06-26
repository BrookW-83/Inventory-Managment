import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middleware/middlewares';
import MessageResponse from './interfaces/MessageResponse';
import addToStockRoute from './routes/addToStockRoute';
import creatShelfRoute from './routes/createShelfRoute'



require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// app.get<{}, MessageResponse>('/', (req, res) => {
//   res.json({
//     message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
//   });
// });

// app.use('/api/v1', api);
app.use('/api', addToStockRoute)
app.use('/api', creatShelfRoute)
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
