import * as fetch from 'node-fetch';

import {Response, User} from './types';

const getUser = async (page?: number): Promise<Response> => {
    const suffix = page !== undefined ? `?page=${page}` : '';
    const res = await fetch(`https://reqres.in/api/users${suffix}`);
    return await res.json();
}

export const fetchData = async () => {
    let result: User[];

    const {page, total_pages, data, per_page} = await getUser();

    result = data;
    let index = page;
    let limit = page;
    while (limit <= total_pages) {
        index += 1;
        const {data} = await getUser(index);
        result = [...result, ...data];
        limit += per_page;
    }

    return result;
}
