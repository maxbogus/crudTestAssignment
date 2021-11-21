import puppeteer, {Page} from 'puppeteer';

const siteUrl = process.env.URL || 'localhost';
const login = process.env.LOGIN || 'login';
const pass = process.env.PASS || 'pass';
const debugMode = process.env.DEBUG || false;

const delay = 50;
const waitDelay = 3000;
const path = 'screenshots/';
const extension = 'png';

const debugParams = {
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

export const parseData = async () => {
    console.log('Start puppeteer');

    let result = [];

    const authorize = async (page: Page) => {
        await page.type('input[name=username]', login, {delay: delay})
        await page.type('input[name=password]', pass, {delay: delay})
        await page.screenshot({path: path + 'form.' + extension});
        await page.click('button[type=submit]', {delay: delay});
        await page.waitForTimeout(waitDelay);
        if (debugMode) {
            await page.screenshot({path: path + 'submit.' + extension});
        }
    }

    // navigate to list page
    const navigateToList = async (page: Page, type: string) => {
        await page.goto(`${siteUrl}list?type=` + type);
        await page.waitForTimeout(waitDelay);
        if (debugMode) {
            await page.screenshot({path: path + 'dates_page.' + extension});
        }
    }

    const closeBanner = async (page: Page) => {
        try {
            await page.click('a#pushActionRefuse', {delay: delay});
        } catch (e) {
            console.log('banner is already closed');
        }

        await page.waitForTimeout(waitDelay);
    }

    const selectDates = async (page: Page) => {
        // select all dates
        await page.click('#datepicker', {delay: delay});
        // @ts-ignore
        await page.evaluate(() => document.querySelector('input[name=daterangepicker_start]').value = "")
        const startDate = '10/01/2021';
        await page.type('input[name=daterangepicker_start]', startDate, {delay: delay});
        // @ts-ignore
        await page.evaluate(() => document.querySelector('input[name=daterangepicker_end]').value = "")
        const endDate = '10/30/2021';
        await page.type('input[name=daterangepicker_end]', endDate, {delay: delay});
        await page.click('button.applyBtn', {delay: delay});

        if (debugMode) {
            await page.screenshot({path: path + 'changed_dates.' + extension});
        }

        await page.waitForTimeout(waitDelay);
    }

    const selectEntries = async (page: Page) => {
        // select all entries
        await page.click('button[title="5 entries"', {delay: delay});
        await page.click('div.dropdown-menu.open ul li:last-child a', {delay: delay});

        if (debugMode) {
            await page.screenshot({path: path + 'all_entries.' + extension});
        }

        await page.waitForTimeout(waitDelay);
    }

    const parseTableRows = async (page: Page) => {
        // get data from table
        const tableRows = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('table[data-url="dates"] tbody tr'));
            // @ts-ignore
            return rows.map(td => td.innerText);
        });
        if (debugMode) {
            await page.screenshot({path: path + 'datesPage.' + extension});
        }

        result = tableRows;
    }

    await (async () => {
        const browser = await puppeteer.launch(debugMode ? debugParams : undefined);
        const page = await browser.newPage();

        await page.goto(siteUrl);

        await authorize(page);

        await navigateToList(page, 'dates');

        await closeBanner(page);

        await selectDates(page);

        await selectEntries(page);

        await parseTableRows(page);

        await browser.close();
    })();

    console.log('Stop puppeteer');
    return result;
};