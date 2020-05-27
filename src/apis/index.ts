export const getIndexAsync = (url: string): Promise<ShyftIndex> => {
    return fetch(url).then((response) => response.json());
};
