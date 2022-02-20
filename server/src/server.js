import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { query } from './config/db.js';
import router from './routes/router.js';

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  let ip = req.headers['x-forwarded-for'] || req.ip;
  ip = ip.startsWith('::') ? '127.0.0.1' : ip;
  req.clientIp = ip.split(',')[0];
  next();
})
app.use('/api', router);

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Now listening on port', port);
});
