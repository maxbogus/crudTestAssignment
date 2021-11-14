import express from 'express';
import bodyParser from 'body-parser';
import * as fetch from 'node-fetch';

// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
    res.send("Hello World");
});

interface Response {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
}

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

const getUser = async (page?: number): Promise<Response> => {
    const suffix = page !== undefined ? `?page=${page}` : '';
    const res = await fetch(`https://reqres.in/api/users}${suffix}`);
    return await res.json();
}

const fetchData = async () => {
    let result: User[];

    const {page, total_pages, data, per_page} = await getUser();

    result = data;
    let index = page;
    let limit = page;
    while ( limit <= total_pages) {
        index += 1;
        const {data} = await getUser(index);
        result = [...result, ...data];
        limit += per_page;
    }

    return result;
}

fetchData().then(r => console.log(r));

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});