export const getIndexAsync = (url) => {
    return fetch(url).then((response) => response.json());
};

export const getProductDataAsync = (url, region, run) => {
    url = `${url}/${run}-${region}`;

    return fetch(url).then((response) => response.json());
};