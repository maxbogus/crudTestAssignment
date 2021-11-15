import puppeteer from 'puppeteer';

export const parseData = async () => {
    console.log('Start puppeteer');

    let result = [];
    await (async () => {
        // const browser = await puppeteer.launch();
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        });
        const page = await browser.newPage();
        await page.goto('https://develop.pub.afflu.net/');
        await page.type('input[name=username]', 'developertest@affluent.io', {delay: 50})
        await page.type('input[name=password]', 'Wn4F6g*N88EPiOyW', {delay: 50})
        await page.screenshot({path: 'screenshots/form.png'});
        await page.click('button[type=submit]', {delay:50});
        await page.waitForTimeout(3000);
        await page.screenshot({path: 'screenshots/submit.png'});
        // too many attempts

        // navigate to dates page
        await page.goto('https://develop.pub.afflu.net/list?type=dates');
        await page.waitForTimeout(5000);
        await page.screenshot({path: 'screenshots/dates_page.png'});

        try {
            await page.click('a#pushActionRefuse', {delay:50});
        } catch (e) {
            console.log('banner is already closed');
        }

        await page.waitForTimeout(5000);

        // select all dates
        await page.click('#datepicker', {delay:50});
        // @ts-ignore
        await page.evaluate( () => document.querySelector('input[name=daterangepicker_start]').value = "")
        await page.type('input[name=daterangepicker_start]', '10/01/2021', {delay: 50});
        // @ts-ignore
        await page.evaluate( () => document.querySelector('input[name=daterangepicker_end]').value = "")
        await page.type('input[name=daterangepicker_end]', '10/30/2021', {delay: 50});
        await page.click('button.applyBtn', {delay:50});
        await page.screenshot({path: 'screenshots/changed_dates.png'});

        await page.waitForTimeout(5000);

        // select all entries
        await page.click('button[title="5 entries"', {delay:50});
        await page.click('div.dropdown-menu.open ul li:last-child a', {delay:50});
        // await page.click('button[title="5 entries"', {delay:50});
        await page.screenshot({path: 'screenshots/all_entries.png'});

        await page.waitForTimeout(5000);

        // get data from table
        const tableRows = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('table[data-url="dates"] tbody tr'));
            // @ts-ignore
            return rows.map(td => td.innerText);
        });
        await page.screenshot({path: 'screenshots/datesPage.png'});

        result = tableRows;
        await browser.close();
    })();

    console.log('Stop puppeteer');
    return result;
};