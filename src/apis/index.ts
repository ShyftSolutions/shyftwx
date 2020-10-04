export const getProductUrl = (
    baseUrl: string,
    customerId: string,
    datasetId: string,
    region?: string,
    run?: string
): string => {
    return `${baseUrl}/${customerId}/${datasetId}/products${region && run ? `/${run}-${region}` : ''}`;
};

export const getOutputUrl = (baseUrl: string, customerId: string, datasetId: string, run?: string): string => {
    return `${baseUrl}/${customerId}/${datasetId}/outputs${run ? `/${run}` : ''}`;
};

export const getIndexAsync = (baseUrl: string, customerId: string, datasetId: string): Promise<ShyftIndex> => {
    const url = getProductUrl(baseUrl, customerId, datasetId);

    return fetch(url).then((response) => response.json());
};

export const getProductDataAsync = (
    baseUrl: string,
    customerId: string,
    datasetId: string,
    region: string,
    run: string
) => {
    const url = getProductUrl(baseUrl, customerId, datasetId, region, run);

    return fetch(url).then((response) => response.json());
};

export const getOutputStatusAsync = (
    baseUrl: string,
    customerId: string,
    datasetId: string
): Promise<{ runs: string[] }> => {
    const url = getOutputUrl(baseUrl, customerId, datasetId);

    return fetch(url).then((response) => (response.status !== 200 ? Promise.reject(response) : response.json()));
};

export const getOutputRunStatusAsync = (
    baseUrl: string,
    customerId: string,
    datasetId: string,
    run: string
): Promise<{
    total_available: number;
}> => {
    const url = getOutputUrl(baseUrl, customerId, datasetId, run);

    return fetch(url).then((response) => response.json());
};
