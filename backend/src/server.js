import express from 'express';
import { ENV } from './config/env.js';
import { serve } from 'inngest/express';
import { connectDb } from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from './config/inngest.js';

const app = express();
const port = ENV.PORT;

app.use(clerkMiddleware());
app.use(express.json());
app.use('/api/inngest', serve({ client: inngest, functions }));

app.get('/', (req, res) => {
  res.send('hello world');
});

const startServer = async () => {
  try {
    await connectDb();
    if (process.env.NODE_ENV === 'development') {
      app.listen(port, () => {
        console.log(`App is listening on Port: ${port}`);
      });
    }
  } catch (error) {
    console.log('Error Starting Server', error);
    process.exit(1);
  }
};

startServer();
