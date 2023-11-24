import express from 'express';
import config from './src/config/config';
import WebScrapingController from './src/api/v1/WebScrapingController';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', WebScrapingController);

// Start server
app.listen(config.PORT, () => {
  console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
});
