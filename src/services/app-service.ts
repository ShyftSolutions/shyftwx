import { getOutputRunStatusAsync, getOutputStatusAsync } from '../apis';

export enum AppStatus {
    Unknown = 0,
    Okay = 1,
    NoBaseUrl = 2,
    NoData = 3,
    Error = 4
}

export async function validateAppAsync(baseUrl: string, customerId: string, datasetId: string): Promise<AppStatus> {
    if (!baseUrl) {
        return AppStatus.NoBaseUrl;
    }

    if (!customerId || !datasetId) {
        return AppStatus.Unknown;
    }

    const outputStatus = await getOutputStatusAsync(baseUrl, customerId, datasetId).catch(() => undefined);

    // If there are no runs, unknown status
    if (!(outputStatus && outputStatus.runs)) {
        return AppStatus.Unknown;
    }

    if (outputStatus.runs.length === 0) {
        return AppStatus.NoData;
    }

    const outputRunStatus = await getOutputRunStatusAsync(baseUrl, customerId, datasetId, outputStatus.runs[0]);

    // If there is no available data for a run, no data
    if (!(outputRunStatus && outputRunStatus.total_available > 0)) {
        return AppStatus.NoData;
    }

    return AppStatus.Okay;
}
