import express from 'express';
import { ENV } from './config/env.js';
import { connectDb } from './config/db.js';

const app = express();
const port = ENV.PORT;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`App is listening on Port: ${port}`);
  connectDb();
});
