export declare const getProductUrl: (baseUrl: string, customerId: string, datasetId: string, region?: string | undefined, run?: string | undefined) => string;
export declare const getOutputUrl: (baseUrl: string, customerId: string, datasetId: string, run?: string | undefined) => string;
export declare const getIndexAsync: (baseUrl: string, customerId: string, datasetId: string) => Promise<ShyftIndex>;
export declare const getProductDataAsync: (baseUrl: string, customerId: string, datasetId: string, region: string, run: string) => Promise<any>;
export declare const getOutputStatusAsync: (baseUrl: string, customerId: string, datasetId: string) => Promise<{
    runs: string[];
}>;
export declare const getOutputRunStatusAsync: (baseUrl: string, customerId: string, datasetId: string, run: string) => Promise<{
    total_available: number;
}>;
