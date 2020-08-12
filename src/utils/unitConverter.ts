export function convertUnits(fromUnit: string, toUnit: string, fromVals: number[]) {
    if (fromUnit === Units.MPH && toUnit === Units.KPH) {
        return fromVals.map(val => val * 1.60934)
    }

    if (fromUnit === Units.KPH && toUnit === Units.MPH) {
        return fromVals.map(val => val / 1.60934)
    }

    return [0,0];
}