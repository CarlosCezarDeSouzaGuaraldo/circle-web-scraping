import puppeteer, { Browser, ElementHandle, Page } from 'puppeteer'
import { Screenshot, WebScrapingServiceResponse } from '../types/GlobalTypes'
import config from '../config/config'

export class WebScrapingService {

    /**
     * Performs the web scraping process.
     * @returns A promise that resolves with the web scraping response.
     */
    public static async PerformWebScraping(): Promise<WebScrapingServiceResponse> {
        try {
            const browser = await WebScrapingService.launchBrowser()
            const page = await browser.newPage()

            await page.goto(config.SITE_URL)
            await page.setViewport({
                width: 1240,
                height: 1024,
            })

            const orderThisItemXpath = '/html/body/div[8]/div[2]/div/div/div[1]/div[2]/div[1]/div[2]/div[1]/a[1]'
            const orderThisItem = await page.$x(orderThisItemXpath)
            await WebScrapingService.clickOn(orderThisItem)
            WebScrapingService.log('Order this Item')

            await WebScrapingService.delay()

            const proceedToCheckoutXpath = '//*[@id="div_cart_modal_body"]/div/a[1]'
            const proceedToCheckout = await page.$x(proceedToCheckoutXpath)
            await WebScrapingService.clickOn(proceedToCheckout)
            WebScrapingService.log('Proceed to Checkout')

            await page.waitForNavigation()

            const secondProceedToCheckoutXpath = '//*[@id="main-content"]/div/div[2]/div[2]/a'
            const secondProceedToCheckout = await page.$x(secondProceedToCheckoutXpath)
            await WebScrapingService.clickOn(secondProceedToCheckout)
            WebScrapingService.log('Proceed to Checkout')

            await page.waitForNavigation()

            const userNameInputXpath = '//*[@id="user_name"]'
            const userNameInput = await page.$x(userNameInputXpath)
            await WebScrapingService.type(userNameInput, config.SITE_EMAIL)

            const passwordInputXpath = '//*[@id="password"]'
            const passwordInput = await page.$x(passwordInputXpath)
            await WebScrapingService.type(passwordInput, config.SITE_PASSWORD)

            const loginAndCheckoutXpath = '//*[@id="main-content"]/div/div/div[2]/form[1]/div/div/div[4]/p/input'
            const loginAndCheckout = await page.$x(loginAndCheckoutXpath)
            await WebScrapingService.clickOn(loginAndCheckout)
            WebScrapingService.log('Login and Checkout')

            await page.waitForNavigation()

            const shippingAddressXpath = '//*[@id="shipping-address-stage"]/div/div[1]/div/label'
            const shippingAddress = await page.$x(shippingAddressXpath)

            if (!shippingAddress || shippingAddress.length <= 0) {
                await WebScrapingService.createNewShippingAddress(page)
            } else {
                await WebScrapingService.clickOn(shippingAddress)
                WebScrapingService.log('Shipping Address')
            }

            const continueButtonXpath = '//*[@id="btn-validate-action"]'
            const continueButton = await page.$x(continueButtonXpath)
            await WebScrapingService.clickOn(continueButton)
            WebScrapingService.log('Continue')

            await WebScrapingService.delay()

            const deliveryOptionXpath = '//*[@id="delivery-options-stage"]/div/div/div[8]/label'
            const deliveryOption = await page.$x(deliveryOptionXpath)
            await WebScrapingService.clickOn(deliveryOption)
            WebScrapingService.log('Delivery Options')

            await WebScrapingService.clickOn(continueButton)
            WebScrapingService.log('Continue')

            await WebScrapingService.delay()

            const paymentOptionXpath = '//*[@id="payment-options-stage"]/div[1]/div/div[4]/label'
            const paymentOption = await page.$x(paymentOptionXpath)
            await WebScrapingService.clickOn(paymentOption)
            WebScrapingService.log('Payment Options')

            await WebScrapingService.clickOn(continueButton)
            WebScrapingService.log('Continue')

            await WebScrapingService.delay()

            const termsAndConditionXpath = '//*[@id="accept_terms_and_conditions"]'
            const termsAndCondition = await page.$x(termsAndConditionXpath)
            await WebScrapingService.clickOn(termsAndCondition)
            WebScrapingService.log('Terms and Conditions')

            const screenshot = await WebScrapingService.screenshot(page)

            await browser.close()

            return WebScrapingService.handleResponse(screenshot)
        } catch (error) {
            return WebScrapingService.handleErrors(error)
        }
    }

    /**
     * Handles the successful response from the web scraping process.
     * Creates a response object with a success status, a success message,
     * and includes the details of the captured screenshot.
     * @param screenshot - The details of the captured screenshot.
     * @returns The response object indicating a successful web scraping process.
     */
    private static handleResponse(screenshot: Screenshot) {
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
    private static handleErrors(error: any): WebScrapingServiceResponse {
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
     * Creates a new shipping address if the current shipping address is not found.
     * @param page - The Puppeteer page.
     */
    private static async createNewShippingAddress(page: Page) {
        const streetAddressInputXpath = '//*[@id="address_address1"]'
        const streetAddressInput = await page.$x(streetAddressInputXpath)
        await WebScrapingService.type(streetAddressInput, '11 Leamington Street')

        const cityAddressInputXpath = '//*[@id="address_city"]'
        const cityAddressInput = await page.$x(cityAddressInputXpath)
        await WebScrapingService.type(cityAddressInput, 'Christchurch')

        const postCodeAddressInputXpath = '//*[@id="address_post_code"]'
        const postCodeAddressInput = await page.$x(postCodeAddressInputXpath)
        await WebScrapingService.type(postCodeAddressInput, '8024')

        const stateAddressInputXpath = '//*[@id="address_state"]'
        const stateAddressInput = await page.$x(stateAddressInputXpath)
        await WebScrapingService.type(stateAddressInput, 'Canterbury')

        await page.select('#address_country', 'NZ')

        const saveAddressInputXpath = '//*[@id="address_form_container"]/div/input[2]'
        const saveAddressInput = await page.$x(saveAddressInputXpath)
        await WebScrapingService.clickOn(saveAddressInput)
        WebScrapingService.log('Save Address')

        await page.waitForNavigation()

        const shippingAddressXpath = '//*[@id="shipping-address-stage"]/div/div[1]/div/label'
        const shippingAddress = await page.$x(shippingAddressXpath)
        await WebScrapingService.clickOn(shippingAddress)
        WebScrapingService.log('Shipping Address')
    }

    /**
     * Takes a screenshot of the current page.
     * @param page - The Puppeteer page.
     * @returns A promise that resolves with the screenshot details.
     */
    private static async screenshot(page: Page): Promise<Screenshot> {
        const screenshot: string = WebScrapingService.generateScreenshotName()
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
     * Types a given value into the specified web page element.
     * @param element - The web page element to type into.
     * @param value - The value to type into the element.
     * @returns A Promise that resolves when typing is complete.
     */
    private static async type(element: ElementHandle<Node>[], value?: string): Promise<void> {
        const [el] = element
        await (el as ElementHandle).type(value || '')
    }

    /**
     * Launches a new Puppeteer browser instance.
     * @returns A Promise resolving to the Puppeteer browser instance.
     */
    private static async launchBrowser(): Promise<Browser> {
        return await puppeteer.launch({
            headless: false,
            args: ['--start-maximized'],
        })
    }

    /**
     * Delays the execution for a specified period (1 second by default).
     *
     * @returns A Promise that resolves after the specified delay.
     */
    private static async delay(): Promise<void> {
        const ONE_SECOND = 1000
        return new Promise(resolve => setTimeout(resolve, ONE_SECOND))
    }

    /**
     * Clicks on a specified web page element.
     * @param element - The web page element to click.
     * @returns A Promise that resolves when the click is complete.
     */
    private static async clickOn(element: ElementHandle<Node>[]): Promise<void> {
        const [el] = element
        await (el as ElementHandle).click()
    }

    /**
     * Logs a message to the console.
     * @param message - The message to log.
     */
    private static log(message?: string): void {
        if (!message) return
        console.log(`Clicked on: ${message}`)
    }

    /**
     * Generates a unique screenshot file name based on the current date and time.
     * @returns A string representing the screenshot file name.
     */
    private static generateScreenshotName(): string {
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
}
