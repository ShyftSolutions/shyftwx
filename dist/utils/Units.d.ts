export declare enum Units {
    MPH = "mph",
    KPH = "kph",
    IN_HR = "in/hr",
    MM_HR = "mm/hr",
    F = "\u00B0F",
    C = "\u00B0C"
}
export declare const isStandard: (unit: string) => boolean;
export declare const transformUnit: (unit: string) => string;
