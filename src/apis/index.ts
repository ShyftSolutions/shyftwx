export const getIndexAsync = (url) => {
    return fetch(url).then((response) => response.json());
};

export const getProductDataAsync = (url, region, run) => {
    return fetch(`${url}/${run}-${region}`).then((response) => response.json());
};
