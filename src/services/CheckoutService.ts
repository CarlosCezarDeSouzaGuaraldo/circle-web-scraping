import { Page } from 'puppeteer'
import { WebScrapingServiceResponse } from '../types/GlobalTypes'
import config from '../config/config'
import { Helper } from '../helpers/Helper'

export class CheckoutService {

    /**
     * Performs the web scraping process.
     * @returns A promise that resolves with the web scraping response.
     */
    public static async PerformWebScraping(): Promise<WebScrapingServiceResponse> {
        try {
            const browser = await Helper.launchBrowser()
            const page = await browser.newPage()

            await page.goto(config.SITE_URL)
            await page.setViewport({
                width: 1240,
                height: 1024,
            })

            const orderThisItemXpath = '/html/body/div[8]/div[2]/div/div/div[1]/div[2]/div[1]/div[2]/div[1]/a[1]'
            const orderThisItem = await page.$x(orderThisItemXpath)
            await Helper.clickOn(orderThisItem)
            Helper.log('Order this Item')

            await Helper.delay()

            const proceedToCheckoutXpath = '//*[@id="div_cart_modal_body"]/div/a[1]'
            const proceedToCheckout = await page.$x(proceedToCheckoutXpath)
            await Helper.clickOn(proceedToCheckout)
            Helper.log('Proceed to Checkout')

            await page.waitForNavigation()

            const secondProceedToCheckoutXpath = '//*[@id="main-content"]/div/div[2]/div[2]/a'
            const secondProceedToCheckout = await page.$x(secondProceedToCheckoutXpath)
            await Helper.clickOn(secondProceedToCheckout)
            Helper.log('Proceed to Checkout')

            await page.waitForNavigation()

            const userNameInputXpath = '//*[@id="user_name"]'
            const userNameInput = await page.$x(userNameInputXpath)
            await Helper.type(userNameInput, config.SITE_EMAIL)

            const passwordInputXpath = '//*[@id="password"]'
            const passwordInput = await page.$x(passwordInputXpath)
            await Helper.type(passwordInput, config.SITE_PASSWORD)

            const loginAndCheckoutXpath = '//*[@id="main-content"]/div/div/div[2]/form[1]/div/div/div[4]/p/input'
            const loginAndCheckout = await page.$x(loginAndCheckoutXpath)
            await Helper.clickOn(loginAndCheckout)
            Helper.log('Login and Checkout')

            await page.waitForNavigation()

            const shippingAddressXpath = '//*[@id="shipping-address-stage"]/div/div[1]/div/label'
            const shippingAddress = await page.$x(shippingAddressXpath)

            if (!shippingAddress || shippingAddress.length <= 0) {
                await CheckoutService.createNewShippingAddress(page)
            } else {
                await Helper.clickOn(shippingAddress)
                Helper.log('Shipping Address')
            }

            const continueButtonXpath = '//*[@id="btn-validate-action"]'
            const continueButton = await page.$x(continueButtonXpath)
            await Helper.clickOn(continueButton)
            Helper.log('Continue')

            await Helper.delay()

            const deliveryOptionXpath = '//*[@id="delivery-options-stage"]/div/div/div[8]/label'
            const deliveryOption = await page.$x(deliveryOptionXpath)
            await Helper.clickOn(deliveryOption)
            Helper.log('Delivery Options')

            await Helper.clickOn(continueButton)
            Helper.log('Continue')

            await Helper.delay()

            const paymentOptionXpath = '//*[@id="payment-options-stage"]/div[1]/div/div[4]/label'
            const paymentOption = await page.$x(paymentOptionXpath)
            await Helper.clickOn(paymentOption)
            Helper.log('Payment Options')

            await Helper.clickOn(continueButton)
            Helper.log('Continue')

            await Helper.delay()

            const termsAndConditionXpath = '//*[@id="accept_terms_and_conditions"]'
            const termsAndCondition = await page.$x(termsAndConditionXpath)
            await Helper.clickOn(termsAndCondition)
            Helper.log('Terms and Conditions')

            const screenshot = await Helper.screenshot(page)

            await browser.close()

            return Helper.handleResponse(screenshot)
        } catch (error) {
            return Helper.handleErrors(error)
        }
    }

    /**
     * Creates a new shipping address if the current shipping address is not found.
     * @param page - The Puppeteer page.
     */
    private static async createNewShippingAddress(page: Page) {
        const streetAddressInputXpath = '//*[@id="address_address1"]'
        const streetAddressInput = await page.$x(streetAddressInputXpath)
        await Helper.type(streetAddressInput, '11 Leamington Street')

        const cityAddressInputXpath = '//*[@id="address_city"]'
        const cityAddressInput = await page.$x(cityAddressInputXpath)
        await Helper.type(cityAddressInput, 'Christchurch')

        const postCodeAddressInputXpath = '//*[@id="address_post_code"]'
        const postCodeAddressInput = await page.$x(postCodeAddressInputXpath)
        await Helper.type(postCodeAddressInput, '8024')

        const stateAddressInputXpath = '//*[@id="address_state"]'
        const stateAddressInput = await page.$x(stateAddressInputXpath)
        await Helper.type(stateAddressInput, 'Canterbury')

        await page.select('#address_country', 'NZ')

        const saveAddressInputXpath = '//*[@id="address_form_container"]/div/input[2]'
        const saveAddressInput = await page.$x(saveAddressInputXpath)
        await Helper.clickOn(saveAddressInput)
        Helper.log('Save Address')

        await page.waitForNavigation()

        const shippingAddressXpath = '//*[@id="shipping-address-stage"]/div/div[1]/div/label'
        const shippingAddress = await page.$x(shippingAddressXpath)
        await Helper.clickOn(shippingAddress)
        Helper.log('Shipping Address')
    }
}
