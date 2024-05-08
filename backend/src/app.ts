import express from 'express';


import pg from 'pg';
import itemsRoute from './routes/itemsRoute';
import shelfRoute from './routes/shelfRoute';

require('dotenv').config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})



const app = express();

app.use(express.json());

app.use('/routes/auth')
app.use('/routes/items', itemsRoute);
app.use('/routes/shelves', shelfRoute)



export default app;
