import { LineStatus } from './reducers/map/map-actions';
import { LineString } from 'geojson';

declare module 'everpolate';
declare module 'wms-capabilities';

declare type ImpactedSegment = {
    lineString: LineString;
    status: LineStatus;
    data: {
        temp: number;
        wind: number;
        precip: number;
    };
    time: Date;
};

declare type ImpactedRoute = {
    segments: ImpactedSegment[];
};

declare type SimpleShyftRoute = {
    endingTime: Date;
    impactedRoutes: Record<string, ImpactedRoute>;
    startTime: Date;
    geometry: LineString;
    segments: ImpactedSegment[];
};

declare type RouteImpactDataSegment = {
    lineString: LineString;
    temp: number;
    wind: number;
    precip: number;
    startTime: Date;
    endTime?: Date;
    index?: number;
};
