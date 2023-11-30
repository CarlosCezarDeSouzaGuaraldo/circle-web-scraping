import express from 'express';
import { CheckoutService } from '../../services/CheckoutService';
import { LoadStockService } from '../../services/LoadStockService';

const router = express.Router();

router.get('/web-scraping-checkout', async (req, res) => {
    try {
        const result = await CheckoutService.PerformWebScraping();
        res.status(result.status).json(result).end();
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/web-scraping-load-stock', async (req, res) => {
    try {
        const result = await LoadStockService.PerformWebScraping();
        res.status(result.status).json(result).end();
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

export default router;
