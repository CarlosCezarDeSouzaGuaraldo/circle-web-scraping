import puppeteer, { Browser, ElementHandle, Page } from "puppeteer"
import { Screenshot, WebScrapingServiceResponse } from "../types/GlobalTypes"

export class Helper {
    /**
     * Handles the successful response from the web scraping process.
     * Creates a response object with a success status, a success message,
     * and includes the details of the captured screenshot.
     * @param screenshot - The details of the captured screenshot.
     * @returns The response object indicating a successful web scraping process.
     */
    public static handleResponse(screenshot: Screenshot) {
        const response: WebScrapingServiceResponse = {
            status: 200,
            statusMessage: 'success',
            message: 'Web scraping was successful.',
            screenshot: {
                file: screenshot.file,
                path: screenshot.path
            }
        }
        console.log(response)
        return response
    }

    /**
     * Handles errors that occur during the web scraping process.
     * Logs the error to the console, creates a response object with a
     * failure status and message, and returns the response.
     * @param error - The error that occurred during web scraping.
     * @returns The response object indicating a failed web scraping process.
     */
    public static handleErrors(error: any): WebScrapingServiceResponse {
        console.error('Error during web scraping:')
        console.log(error)

        const response: WebScrapingServiceResponse = {
            status: 500,
            statusMessage: 'fail',
            message: 'Web scraping failed.'
        }
        return response
    }

    /**
     * Takes a screenshot of the current page.
     * @param page - The Puppeteer page.
     * @returns A promise that resolves with the screenshot details.
    */
    public static async screenshot(page: Page): Promise<Screenshot> {
        const screenshot: string = this.generateScreenshotName()
        const path = `assets/screenshots/${screenshot}`

        await page.screenshot({
            path: path,
            fullPage: true
        }).then(() => {
            console.log(`Screenshot: ${screenshot} saved`)
        })

        return {
            file: screenshot,
            path: path
        }
    }

    /**
     * Generates a unique screenshot file name based on the current date and time.
     * @returns A string representing the screenshot file name.
    */
    public static generateScreenshotName(): string {
        const currentDate = new Date()

        // Get date components
        const year = currentDate.getFullYear()
        const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Month is zero-indexed
        const day = String(currentDate.getDate()).padStart(2, '0')
        const hours = String(currentDate.getHours()).padStart(2, '0')
        const minutes = String(currentDate.getMinutes()).padStart(2, '0')
        const seconds = String(currentDate.getSeconds()).padStart(2, '0')

        // Concatenate the word "screenshot" with the date components
        return `screenshot-${year}-${month}-${day}-${hours}h${minutes}m${seconds}s.png`
    }

    /**
     * Launches a new Puppeteer browser instance.
     * @returns A Promise resolving to the Puppeteer browser instance.
     */
    public static async launchBrowser(): Promise<Browser> {
        return await puppeteer.launch({
            headless: false,
            args: ['--start-maximized'],
        })
    }

    /**
     * Types a given value into the specified web page element.
     * @param element - The web page element to type into.
     * @param value - The value to type into the element.
     * @returns A Promise that resolves when typing is complete.
    */
    public static async type(element: ElementHandle<Node>[], value?: string): Promise<void> {
        const [el] = element
        await (el as ElementHandle).type(value || '')
    }

    /**
     * Clicks on a specified web page element.
     * @param element - The web page element to click.
     * @returns A Promise that resolves when the click is complete.
     */
    public static async clickOn(element: ElementHandle<Node>[]): Promise<void> {
        const [el] = element
        await (el as ElementHandle).click()
    }

    /**
     * Delays the execution for a specified period (1 second by default).
     *
     * @returns A Promise that resolves after the specified delay.
     */
    public static async delay(): Promise<void> {
        const ONE_SECOND = 1000
        return new Promise(resolve => setTimeout(resolve, ONE_SECOND))
    }

    /**
     * Logs a message to the console.
     * @param message - The message to log.
     */
    public static log(message?: string): void {
        if (!message) return
        console.log(`Clicked on: ${message}`)
    }
}