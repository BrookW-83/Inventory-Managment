import express from 'express';
import { urlencoded } from "body-parser";
import {Pool} from 'pg';
import itemsRoute from './routes/itemsRoute';
import shelfRoute from './routes/shelfRoute';

require('dotenv').config();


const app = express();

const connectionPoint = process.env.POSTGRES_URL;

const pool = new Pool({
  connectionString: connectionPoint,
  ssl: {
    rejectUnauthorized: false,
  },
});





app.use(express.json());
app.use(urlencoded({extended: true}));
app.use('/routes/auth')
app.use('/routes/items', itemsRoute);
app.use('/routes/shelves', shelfRoute)


const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await pool.connect()
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});



export default app;
