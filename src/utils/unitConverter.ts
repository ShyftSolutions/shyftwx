import { Units } from './Units';

export function convertUnits(fromUnit: string, toUnit: string, fromVals: number[]) {
    if (fromUnit === Units.MPH || fromUnit === Units.KPH) {
        return convertSpeeds(fromUnit, toUnit, fromVals);
    }

    if (fromUnit === Units.F || fromUnit === Units.C) {
        return convertTemps(fromUnit, toUnit, fromVals);
    }

    if (fromUnit === Units.IN_HR || fromUnit === Units.MM_HR) {
        return convertAmounts(fromUnit, toUnit, fromVals);
    }

    return fromVals;
}

const convertSpeeds = (fromUnit: string, toUnit: string, fromVals: number[]) => {
    const MPH_KPH_UNIT = 1.60934;

    if (fromUnit === Units.MPH && toUnit === Units.KPH) {
        return fromVals.map(val => val * MPH_KPH_UNIT)
    }

    if (fromUnit === Units.KPH && toUnit === Units.MPH) {
        return fromVals.map(val => val / MPH_KPH_UNIT)
    }

    return fromVals;
}

const convertTemps = (fromUnit: string, toUnit: string, fromVals: number[]) => {
    if (fromUnit === Units.F && toUnit === Units.C) {
        const fToCFormula = (f) => (f - 32) * (5/9);

        return fromVals.map(val => fToCFormula(val))
    }

    if (fromUnit === Units.C && toUnit === Units.F) {
        const cToFFormula = (c) => (c * (9/5)) + 32;

        return fromVals.map(val => cToFFormula(val))
    }

    return fromVals;
}

const convertAmounts = (fromUnit: string, toUnit: string, fromVals: number[]) => {
    const IN_MM_UNIT = 25.4;

    if (fromUnit === Units.IN_HR && toUnit === Units.MM_HR) {
        return fromVals.map(val => val * IN_MM_UNIT)
    }

    if (fromUnit === Units.MM_HR && toUnit === Units.IN_HR) {
        return fromVals.map(val => val / IN_MM_UNIT)
    }

    return fromVals;
}