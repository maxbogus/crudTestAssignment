import puppeteer from 'puppeteer';

export const parseData = async () => {
    console.log('Start puppeteer');

    let result = [];
    await (async () => {
        const browser = await puppeteer.launch();
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
        await page.waitForTimeout(3000);
        await page.screenshot({path: 'screenshots/dates_page.png'});

        try {
            await page.waitForTimeout(4000);
            await page.click('#pushActionRefuse', {delay:50});
        } catch (e) {
            console.log('banner is already closed');
        }

        // select all dates
        await page.click('#datepicker', {delay:50});
        await page.type('input[name=daterangepicker_start]', '10/01/2021', {delay: 50});
        await page.type('input[name=daterangepicker_end]', '10/30/2021', {delay: 50});
        await page.click('button.applyBtn', {delay:50});
        await page.screenshot({path: 'screenshots/changed_dates.png'});

        // select all entries
        await page.click('button[title="5 entries"', {delay:50});
        await page.click('div.dropdown-menu.open ul li:last-child a', {delay:50});
        await page.click('button[title="5 entries"', {delay:50});
        await page.screenshot({path: 'screenshots/all_entries.png'});

        await page.screenshot({path: 'screenshots/datesPage.png'});
        // get data from table
        const result = await page.evaluate(() => {
            const rows = document.querySelectorAll('table[data-url="dates"]');
            // @ts-ignore
            return Array.from(rows, row => row.innerText)
        });

        result.shift();
        await browser.close();
    })();

    console.log('Stop puppeteer');
    return result;
};