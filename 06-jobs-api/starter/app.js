require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//environment variables
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;

// routes
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//db connection
const connectDB = require('./db/connect');

// extra packages

// usage
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = PORT || 3000;

const start = async () => {
  try {
    connectDB(MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
