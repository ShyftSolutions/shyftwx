export declare enum AppStatus {
    Unknown = 0,
    Okay = 1,
    NoBaseUrl = 2,
    NoData = 3,
    Error = 4
}
export declare function validateAppAsync(baseUrl: string, customerId: string, datasetId: string): Promise<AppStatus>;
