import '../instrument.mjs';
import express from 'express';
import { ENV } from './config/env.js';
import { serve } from 'inngest/express';
import { connectDb } from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from './config/inngest.js';
import chatRouter from './routes/chat.route.js';
import * as Sentry from '@sentry/node';

const app = express();
const port = ENV.PORT;

app.use(clerkMiddleware());
app.use(express.json());

app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/chat', chatRouter);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/debug-sentry', (req, res) => {
  throw new Error('My first sentry error');
});

// sentry middleware
Sentry.setupExpressErrorHandler(app);

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

export default app;
