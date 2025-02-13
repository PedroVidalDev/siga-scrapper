import { Page } from "puppeteer";

export class ScrapUtils {
    public static async typeInput(page: Page, selector: string, value: string) {
        await page.waitForSelector(selector, { visible: true });
        await page.type(selector, value);
    }
}