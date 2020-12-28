export enum Units {
    MPH = 'mph',
    KPH = 'kph',
    IN_HR = 'in/hr',
    MM_HR = 'mm/hr',
    F = '°F',
    C = '°C'
}

export const isStandard = (unit: string) => {
    // TODO figure out how to make these use the enum vals
    return ['°C', 'in/hr', 'kph'].includes(unit);
};

export const transformUnit = (unit: string) => {
    if (unit === 'T_CELS') return Units.C;

    if (unit === 'P_INCH_H') return Units.IN_HR;

    if (unit === 'S_KT') return Units.KPH;

    return unit;
};
