import { Helper } from "../helpers/Helper";
import { WebScrapingServiceResponse } from "../types/GlobalTypes";

export class LoadStockService {
    public static async PerformWebScraping(): Promise<WebScrapingServiceResponse> {
        try {

            const response: WebScrapingServiceResponse = {
                status: 200,
                statusMessage: 'success',
                message: 'Web scraping was successful.',
                screenshot: {
                    file: "null",
                    path: "null"
                }
            }

            return response
        } catch (error) {
            console.log(error);
            const response: WebScrapingServiceResponse = {
                status: 500,
                statusMessage: 'fail',
                message: 'Web scraping failed.'
            }
            return response
        }
    }
}