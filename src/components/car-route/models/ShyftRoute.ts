import { FeatureCollection, LineString } from 'geojson';
import { carRouteAsync } from '../../../apis/geocoding/geocoding';
import { applyImpactsToRoute } from '../../../reducers/map/map-actions';
import { ImpactedRoute, RouteImpactDataSegment, SimpleShyftRoute } from './index';

export const routes: ShyftRoute[] = [];

export function getSelectedRoute(): ShyftRoute | undefined {
    return routes.find((r) => r._selected);
}

export function setSelectedRoute(selectedRoute: ShyftRoute | undefined) {
    if (!selectedRoute) {
        return;
    }

    let added = false;

    routes.forEach((route) => {
        if (route === selectedRoute) {
            route._selected = true;
            added = true;
        } else {
            route._selected = false;
        }
    });

    if (!added && !routes.includes(selectedRoute)) {
        selectedRoute._selected = true;
        routes.push(selectedRoute);
    }
}

export class ShyftRoute {
    _impactedRoutes: Record<string, ImpactedRoute> = {};

    _activeRoute: ImpactedRoute;

    _impactData: Record<string, RouteImpactDataSegment[]> = {};

    _rawRoute: FeatureCollection = {
        type: 'FeatureCollection',
        features: []
    };
    // _endingTime: Date = new Date();

    _selected = false;

    _loaded = false;

    constructor(start: string, end: string, geometry: LineString, date: Date) {
        this._start = start;
        this._end = end;
        this._geometry = geometry;
        this._startTime = date;
        this._forecasts = 7;
        this._endingTime = new Date();

        this._activeRoute = {
            segments: [
                {
                    status: 0,
                    lineString: {
                        type: 'LineString',
                        coordinates: geometry.coordinates
                    },
                    data: { temp: 0, wind: 0, precip: 0 },
                    time: date
                }
            ]
        };
        this._impactedRoutes[date.toISOString()] = this._activeRoute;
    }

    _start: string;

    get start(): string {
        return this._start;
    }

    _end: string;

    get end(): string {
        return this._end;
    }

    _geometry: LineString;

    get geometry(): LineString {
        return this._geometry;
    }

    _startTime: Date;

    get startTime(): Date {
        return this._startTime;
    }

    get id(): string {
        return `S${this._start}:E${this._end}`;
    }

    _forecasts: number;

    _endingTime: Date;

    set endingTime(d: Date) {
        this._endingTime = d;
    }

    get endingTime(): Date {
        return this._endingTime;
    }

    get impactData(): Record<string, RouteImpactDataSegment[]> {
        return this._impactData;
    }

    toSimpleObject(): SimpleShyftRoute {
        return {
            geometry: this._geometry,
            impactedRoutes: this._impactedRoutes,
            segments: this._activeRoute ? this._activeRoute.segments : [],
            startTime: this._startTime,
            endingTime: this._endingTime
        };
    }

    async applyImpactsAsync(dispatch: any): Promise<void> {
        if (this._loaded) {
            return;
        }

        const promises: Promise<any>[] = [];

        for (let i = 0; i < this._forecasts; i++) {
            const tempStartTime = new Date(this._startTime.getTime() + i * 60 * 60000);

            promises.push(
                carRouteAsync(this._rawRoute, tempStartTime).then((data) => {
                    this._impactData[tempStartTime.toISOString()] = data;
                    dispatch(applyImpactsToRoute(tempStartTime, data, i === 0));
                    return data;
                })
            );
        }

        await Promise.all(promises);

        this._endingTime = this._activeRoute.segments.slice(-1)[0].time;
        // sort the routes based on start time
        Object.entries(this._impactedRoutes).sort((x, y) => new Date(y[0]).getTime() - new Date(x[0]).getTime());

        this._loaded = true;
    }
}

export default ShyftRoute;
