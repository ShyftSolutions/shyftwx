export const getIndexAsync = (url) => {
    return fetch(url).then((response) => response.json());
};
