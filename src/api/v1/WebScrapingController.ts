import express from 'express';
import { WebScrapingService } from '../../services/WebScrapingService';

const router = express.Router();

router.get('/web-scraping-checkout', async (req, res) => {
    try {
        const result = await WebScrapingService.PerformWebScraping();
        res.status(result.status).json(result).end();
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

export default router;
