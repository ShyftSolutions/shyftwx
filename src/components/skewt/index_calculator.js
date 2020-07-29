// var linear = require("everpolate").linear;
import { linear } from 'everpolate';

const zeroCelsiusInKelvin = 273.15;
const ROCP = 0.28571426;
const eps = 0.62197;
const gravity = 9.80665;
const c1 = 0.0498646455;
const c2 = 2.4082965;
const c3 = 7.07475;
const c4 = 38.9114;
const c5 = 0.0915;
const c6 = 1.2035;

export function calculateKIndex(data) {
    const t8 = interpTemp(data, 850);
    const t7 = interpTemp(data, 700);
    const t5 = interpTemp(data, 500);
    const td7 = interpDewPoint(data, 700);
    const td8 = interpDewPoint(data, 850);
    return parseFloat((t8 - t5 + td8 - (t7 - td7)).toFixed(2));
}

export function calculateTotalTotals(data) {
    const c = cTotals(data);
    const v = vTotals(data);
    return parseFloat((c + v).toFixed(2));
}

export function calculateDCAPE(data) {
    const sfc = data[0][0];
    const idx = Array(0);
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] > sfc - 400) {
            idx.push(i);
        } else {
            break;
        }
    }
    let mine = 1000;
    let minp = -999;
    for (let i = idx[0]; i < idx.length; i++) {
        const thetaeMean = meanThetae(data, data[i][0], data[i][0] - 100);
        if (thetaeMean < mine) {
            minp = data[i][0] - 50;
            mine = thetaeMean;
        }
    }

    let uptr = null;
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] >= minp) {
            uptr = i;
        } else {
            break;
        }
    }

    let tp1 = wetbulb(minp, interpTemp(data, minp), interpDewPoint(data, minp));
    let te1 = interpTemp(data, minp);
    let h1 = interpHeight(data, minp);
    let tote = 0;
    let lyre = 0;

    for (let i = uptr; i > -1; i--) {
        const pe2 = data[i][0];
        const te2 = data[i][2];
        const h2 = data[i][1];
        const tp2 = wetLift(minp, tp1, pe2);
        const tdef1 = (tp1 - te1) / celsiusToKelvin(te1);
        const tdef2 = (tp2 - te2) / celsiusToKelvin(te2);
        const lyrelast = lyre;
        lyre = ((9.8 * (tdef1 + tdef2)) / 2.0) * (h2 - h1);
        tote += lyre;

        minp = pe2;
        te1 = te2;
        h1 = h2;
        tp1 = tp2;
    }
    return parseFloat(tote.toFixed(2));
}

export function calculateIndices(data) {
    let lyre = 0;
    let lyrelast = 0;
    let nextLyreLast = 0;
    let liftedIndex = null;
    let equilibriumLevel = null;
    let levelOfFreeConvection = null;
    let bottom = null;
    let lowestPressure = null;
    let CAPE = null;
    let CINH = null;
    const top = data.length - 1;
    const uptr = top;
    const newData = dryLift(data[0][0], data[0][2], data[0][3]);
    const height = interpHeight(data, newData[0]);
    const lcl = aboveGroundLevel(data[0][1], height);
    const newPressure = newData[0];
    const newTemperature = newData[1];
    let totp = 0;
    let totn = 0;
    const pp = Array(0);
    for (let i = data[0][0]; i > newPressure - 1; i--) {
        pp.push(i);
    }
    const hh = interpHeight(data, pp);
    const tempEnvTheta = potentialTemp(pp, interpTemp(data, pp));
    const tmpEnvDewPoint = interpDewPoint(data, pp);
    const tvEnv = virTemp(pp, tempEnvTheta, tmpEnvDewPoint);
    const thetaParcel = potentialTemp(newPressure, newTemperature);
    const blmr = mixRatio(data[0][0], data[0][3]);
    const tmp1 = virTemp(pp, thetaParcel, temperatureAtMixRatio(blmr, pp));
    const tdef = Array(0);
    const tidx1 = Array(0);
    const tidx2 = Array(0);
    for (let i = 0; i < tmp1.length; i++) {
        tdef.push((tmp1[i] - tvEnv[i]) / celsiusToKelvin(tvEnv[i]));
        tidx1.push(i);
        tidx2.push(i + 1);
    }
    tidx1.pop();
    tidx2.pop();
    let sum = 0;
    for (let i = 0; i < tidx1.length; i++) {
        const t1 = tidx1[i];
        const t2 = tidx2[i];
        sum = ((gravity * (tdef[t1] + tdef[t2])) / 2) * (hh[t2] - hh[t1]);
        if (sum < 0) {
            totn += sum;
        }
    }

    if (data[0][0] > newPressure) {
        bottom = newPressure;
    } else {
        bottom = data[0][0];
    }
    let wetTemp = wetLift(newPressure, newTemperature, bottom);
    let interpretedHeight = interpHeight(data, bottom);
    let virtualTemp = vtmp(data, bottom);

    for (let i = 0; i < data.length; i++) {
        if (data[i][0] < bottom) {
            lowestPressure = i;
            break;
        }
    }
    for (let i = lowestPressure; i < data.length; i++) {
        let tempPressure = bottom;
        const newWetTemp = wetLift(bottom, wetTemp, data[i][0]);
        const localVirtualTemp = virTemp(data[i][0], data[i][2], data[i][3]);
        let tdef1 = (virTemp(bottom, wetTemp, wetTemp) - virtualTemp) / celsiusToKelvin(virtualTemp);
        const tdef2 =
            (virTemp(data[i][0], newWetTemp, newWetTemp) - localVirtualTemp) / celsiusToKelvin(localVirtualTemp);

        lyrelast = nextLyreLast;
        lyre = ((gravity * (tdef1 + tdef2)) / 2.0) * (data[i][1] - interpretedHeight);
        nextLyreLast = lyre;

        bottom = data[i][0];
        wetTemp = newWetTemp;
        interpretedHeight = data[i][1];
        virtualTemp = localVirtualTemp;
        if (lyre >= 0 && lyrelast <= 0) {
            const tempWetLift = wetLift(data[i][0], wetTemp, tempPressure);
            if (vtmp(data, tempPressure) < virTemp(tempPressure, tempWetLift, tempWetLift)) {
                equilibriumLevel = null;
                levelOfFreeConvection = aboveGroundLevel(data[0][1], interpHeight(data, tempPressure));
            } else {
                while (vtmp(data, tempPressure) > virTemp(tempPressure, tempWetLift, tempWetLift) && tempPressure > 0) {
                    tempPressure -= 5;
                    if (tempPressure > 0) {
                        levelOfFreeConvection = aboveGroundLevel(data[0][1], interpHeight(data, tempPressure));
                        equilibriumLevel = null;
                    }
                }
            }
        }

        if (lyre <= 0 && lyrelast >= 0) {
            while (
                vtmp(data, tempPressure) <
                virTemp(
                    tempPressure,
                    wetLift(data[i][0], wetTemp, tempPressure),
                    wetLift(data[i][0], wetTemp, tempPressure)
                )
            ) {
                tempPressure -= 5;
            }
            equilibriumLevel = aboveGroundLevel(data[0][1], interpHeight(data, tempPressure));
        }

        if (lyre > 0) {
            totp += lyre;
        } else if (data[i][0] > 500) {
            totn += lyre;
        }
        if (i >= uptr && CAPE == null) {
            if (lyre > 0) {
                CAPE = totp = lyre;
                CINH = totn;
            } else {
                CAPE = totp;
                if (data[i][0] > 500) {
                    CINH = totn + lyre;
                } else {
                    CINH = totn;
                }
            }
            const tempWetLift = wetLift(data[i][0], newWetTemp, data[data.length - 1][0]);
            const tempvtmp = vtmp(data, data[data.length - 1][0]);
            tdef1 =
                (virTemp(data[data.length - 1][0], tempWetLift, tempWetLift) - tempvtmp) / celsiusToKelvin(tempvtmp);
            lyre = ((gravity * (tdef1 + tdef2)) / 2) * (interpHeight(data, data[data.length - 1][0]) - data[i][0]);
            if (lyre > 0) {
                CAPE += lyre;
            } else if (data[data.length - 1][0] > 500) {
                CINH += lyre;
            }
            if (CAPE == 0) {
                CINH = 0;
            }
        }

        if (data[i][0] <= 500 && liftedIndex == null) {
            const a = vtmp(data, 500);
            const b = wetLift(data[i][0], wetTemp, 500);
            liftedIndex = a - virTemp(500, b, b);
        }
    }
    if (CAPE == null) {
        CAPE = totp;
    }
    if (Math.floor(CAPE) == 0) {
        CINH = 0;
    }
    return [
        parseFloat(CAPE.toFixed(2)),
        parseFloat(CINH.toFixed(2)),
        parseFloat(lcl.toFixed(2)),
        parseFloat(liftedIndex.toFixed(2)),
        parseFloat(levelOfFreeConvection.toFixed(2)),
        parseFloat(equilibriumLevel.toFixed(2))
    ];
}

function calculateCAPEAndCINH(data) {
    let bottom = null;
    let lowestPressure = null;
    let CAPE = null;
    let CINH = null;
    const top = data.length - 1;
    const uptr = top;
    const newData = dryLift(data[0][0], data[0][2], data[0][3]);
    const newPressure = newData[0];
    const newTemperature = newData[1];
    let totp = 0;
    let totn = 0;
    const pp = Array(0);
    for (let i = data[0][0]; i > newPressure - 1; i--) {
        pp.push(i);
    }
    const hh = interpHeight(data, pp);
    const tempEnvTheta = potentialTemp(pp, interpTemp(data, pp));
    const tmpEnvDewPoint = interpDewPoint(data, pp);
    const tvEnv = virTemp(pp, tempEnvTheta, tmpEnvDewPoint);
    const thetaParcel = potentialTemp(newPressure, newTemperature);
    const blmr = mixRatio(data[0][0], data[0][3]);
    const tmp1 = virTemp(pp, thetaParcel, temperatureAtMixRatio(blmr, pp));
    const tdef = Array(0);
    const tidx1 = Array(0);
    const tidx2 = Array(0);
    for (let i = 0; i < tmp1.length; i++) {
        tdef.push((tmp1[i] - tvEnv[i]) / celsiusToKelvin(tvEnv[i]));
        tidx1.push(i);
        tidx2.push(i + 1);
    }
    tidx1.pop();
    tidx2.pop();
    let sum = 0;
    for (let i = 0; i < tidx1.length; i++) {
        const t1 = tidx1[i];
        const t2 = tidx2[i];
        sum = ((gravity * (tdef[t1] + tdef[t2])) / 2) * (hh[t2] - hh[t1]);
        if (sum < 0) {
            totn += sum;
        }
    }

    if (data[0][0] > newPressure) {
        bottom = newPressure;
    } else {
        bottom = data[0][0];
    }
    let wetTemp = wetLift(newPressure, newTemperature, bottom);
    let interpretedHeight = interpHeight(data, bottom);
    let virtualTemp = vtmp(data, bottom);

    for (let i = 0; i < data.length; i++) {
        if (data[i][0] < bottom) {
            lowestPressure = i;
            break;
        }
    }
    for (let i = lowestPressure; i < data.length; i++) {
        const newWetTemp = wetLift(bottom, wetTemp, data[i][0]);
        const localVirtualTemp = virTemp(data[i][0], data[i][2], data[i][3]);
        let tdef1 = (virTemp(bottom, wetTemp, wetTemp) - virtualTemp) / celsiusToKelvin(virtualTemp);
        const tdef2 =
            (virTemp(data[i][0], newWetTemp, newWetTemp) - localVirtualTemp) / celsiusToKelvin(localVirtualTemp);

        let lyre = ((gravity * (tdef1 + tdef2)) / 2.0) * (data[i][1] - interpretedHeight);

        bottom = data[i][0];
        wetTemp = newWetTemp;
        interpretedHeight = data[i][1];
        virtualTemp = localVirtualTemp;
        if (lyre > 0) {
            totp += lyre;
        } else if (data[i][0] > 500) {
            totn += lyre;
        }
        if (i >= uptr && CAPE == null) {
            if (lyre > 0) {
                CAPE = totp = lyre;
                CINH = totn;
            } else {
                CAPE = totp;
                if (data[i][0] > 500) {
                    CINH = totn + lyre;
                } else {
                    CINH = totn;
                }
            }
            const tempWetLift = wetLift(data[i][0], newWetTemp, data[data.length - 1][0]);
            const tempvtmp = vtmp(data, data[data.length - 1][0]);
            tdef1 =
                (virTemp(data[data.length - 1][0], tempWetLift, tempWetLift) - tempvtmp) / celsiusToKelvin(tempvtmp);
            lyre = ((gravity * (tdef1 + tdef2)) / 2) * (interpHeight(data, data[data.length - 1][0]) - data[i][0]);
            if (lyre > 0) {
                CAPE += lyre;
            } else if (data[data.length - 1][0] > 500) {
                CINH += lyre;
            }
            if (CAPE == 0) {
                CINH = 0;
            }
        }
    }
    if (CAPE == null) {
        CAPE = totp;
    }
    if (Math.floor(CAPE) == 0) {
        CINH = 0;
    }
    return [CAPE, CINH];
}

function calculateLCL(data) {
    const newData = dryLift(data[0][0], data[0][2], data[0][3]);
    const height = interpHeight(data, newData[0]);
    return aboveGroundLevel(data[0][1], height);
}

function calculateELAndLFC(data) {
    let lyre = 0;
    let lyrelast = 0;
    const newData = dryLift(data[0][0], data[0][2], data[0][3]);
    const newPressure = newData[0];
    const newTemperature = newData[1];
    let bottom = null;
    let equilibriumLevel = null;
    let levelOfFreeConvection = null;
    if (data[0][0] > newPressure) {
        bottom = newPressure;
    } else {
        bottom = data[0][0];
    }
    let interpretedHeight = interpHeight(data, bottom);
    let lowestPressure = null;
    let wetTemp = wetLift(newPressure, newTemperature, bottom);
    let virtualTemp = vtmp(data, bottom);
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] < bottom) {
            lowestPressure = i;
            break;
        }
    }
    for (let i = lowestPressure; i < data.length; i++) {
        let tempPressure = bottom;
        const newWetTemp = wetLift(bottom, wetTemp, data[i][0]);

        const localVirtualTemp = virTemp(data[i][0], data[i][2], data[i][3]);
        const tdef1 = (virTemp(bottom, wetTemp, wetTemp) - virtualTemp) / celsiusToKelvin(virtualTemp);
        const tdef2 =
            (virTemp(data[i][0], newWetTemp, newWetTemp) - localVirtualTemp) / celsiusToKelvin(localVirtualTemp);

        lyrelast = lyre;
        lyre = ((gravity * (tdef1 + tdef2)) / 2.0) * (data[i][1] - interpretedHeight);

        bottom = data[i][0];
        wetTemp = newWetTemp;
        interpretedHeight = data[i][1];
        virtualTemp = localVirtualTemp;

        if (lyre >= 0 && lyrelast <= 0) {
            const tempWetLift = wetLift(data[i][0], wetTemp, tempPressure);
            if (vtmp(data, tempPressure) < virTemp(tempPressure, tempWetLift, tempWetLift)) {
                equilibriumLevel = null;
                levelOfFreeConvection = aboveGroundLevel(data[0][1], interpHeight(data, tempPressure));
            } else {
                while (vtmp(data, tempPressure) > virTemp(tempPressure, tempWetLift, tempWetLift) && tempPressure > 0) {
                    tempPressure -= 5;
                    if (tempPressure > 0) {
                        levelOfFreeConvection = aboveGroundLevel(data[0][1], interpHeight(data, tempPressure));
                        equilibriumLevel = null;
                    }
                }
            }
        }

        if (lyre <= 0 && lyrelast >= 0) {
            while (
                vtmp(data, tempPressure) <
                virTemp(
                    tempPressure,
                    wetLift(data[i][0], wetTemp, tempPressure),
                    wetLift(data[i][0], wetTemp, tempPressure)
                )
            ) {
                tempPressure -= 5;
            }
            equilibriumLevel = aboveGroundLevel(data[0][1], interpHeight(data, tempPressure));
        }
    }
    return [equilibriumLevel, levelOfFreeConvection];
}

function calculateLiftedIndex(data) {
    const newData = dryLift(data[0][0], data[0][2], data[0][3]);
    const newPressure = newData[0];
    const newTemperature = newData[1];
    let bottom = null;
    if (data[0][0] > newPressure) {
        bottom = newPressure;
    } else {
        bottom = data[0][0];
    }
    let wetTemp = wetLift(newPressure, newTemperature, bottom);
    let lowestPressure = null;
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] < bottom) {
            lowestPressure = i;
            break;
        }
    }
    for (let i = lowestPressure; i < data.length; i++) {
        wetTemp = wetLift(bottom, wetTemp, data[i][0]);
        bottom = data[i][0];
        if (data[i][0] <= 500) {
            const a = vtmp(data, 500);
            const b = wetLift(data[i][0], wetTemp, 500);
            return a - virTemp(500, b, b);
        }
    }
}

function virTemp(pressure, temperature, dewPoint) {
    if (Array.isArray(pressure)) {
        if (Array.isArray(temperature)) {
            const virtualTemps = Array(0);
            for (let i = 0; i < pressure.length; i++) {
                virtualTemps.push(virTemp(pressure[i], temperature[i], dewPoint[i]));
            }
            return virtualTemps;
        } else {
            const virtualTemps = Array(0);
            for (let i = 0; i < pressure.length; i++) {
                virtualTemps.push(virTemp(pressure[i], temperature, dewPoint[i]));
            }
            return virtualTemps;
        }
    } else {
        const tempKelvin = temperature + zeroCelsiusInKelvin;
        const w = 0.001 * mixRatio(pressure, dewPoint);
        const vt = (tempKelvin * (1.0 + w / eps)) / (1.0 + w) - zeroCelsiusInKelvin;
        return vt;
    }
}

function mixRatio(pressure, temperature) {
    if (Array.isArray(temperature)) {
        const mixRatios = Array(0);
        for (let i = 0; i < pressure.length; i++) {
            mixRatios.push(mixRatio(pressure[i], temperature[i]));
        }
        return mixRatios;
    } else {
        const x = 0.02 * (temperature - 12.5 + 7500.0 / pressure);
        const wfw = 1.0 + 0.0000045 * pressure + 0.0014 * x * x;
        const fwesw = wfw * vaporPressure(temperature);
        return 621.97 * (fwesw / (pressure - fwesw));
    }
}

function vaporPressure(temperature) {
    let pol = temperature * (1.1112018e-17 + temperature * -3.0994571e-20);
    pol = temperature * (2.1874425e-13 + temperature * (-1.789232e-15 + pol));
    pol = temperature * (4.388418e-9 + temperature * (-2.988388e-11 + pol));
    pol = temperature * (7.8736169e-5 + temperature * (-6.111796e-7 + pol));
    pol = 0.99999683 + temperature * (-9.082695e-3 + pol);
    return 6.1078 / pol ** 8;
}

function vtmp(data, targetPressure) {
    const logPressures = Array(data.length);
    const virtualTemps = Array(data.length);
    for (let i = data.length - 1; i > -1; i--) {
        logPressures[i] = Math.log10(data[data.length - i - 1][0]);
    }
    for (let i = 0; i < data.length; i++) {
        virtualTemps[data.length - i - 1] = virTemp(data[i][0], data[i][2], data[i][3]);
    }

    return genericInterpPres(Math.log10(targetPressure), logPressures, virtualTemps);
}

function genericInterpPres(targetPressure, pressures, field) {
    const field_interp = linear(targetPressure, pressures, field);
    return field_interp[0];
}

function wetLift(pressure, temperature, final_pressure = 1000.0) {
    const potentialTemperature = potentialTemp(pressure, temperature);
    const test1 = wobf(potentialTemperature);
    const test2 = wobf(temperature);
    const thetam = potentialTemperature - test1 + test2;
    return satlift(final_pressure, thetam);
}

function potentialTemp(pressure, temperature, referencePressure = 1000) {
    if (Array.isArray(pressure)) {
        const potentials = Array();
        for (let i = 0; i < pressure.length; i++) {
            potentials[i] =
                (temperature[i] + zeroCelsiusInKelvin) * (referencePressure / pressure[i]) ** ROCP -
                zeroCelsiusInKelvin;
        }
        return potentials;
    } else {
        return (temperature + zeroCelsiusInKelvin) * (referencePressure / pressure) ** ROCP - zeroCelsiusInKelvin;
    }
}

function wobf(temperature) {
    const nums = Array(0);
    if (Array.isArray(temperature)) {
        const temp = Array;
        for (let i = 0; i < temperature.length; i++) {
            temp[i] = temperature[i] - 20;
        }
        for (let i = 0; i < temperature.length; i++) {
            nums.push(wobf(temp[i]));
        }
        return nums;
    } else {
        const temp = temperature - 20;
        if (temp <= 0) {
            let npol =
                1 +
                temp *
                    (-8.841660499999999e-3 +
                        temp *
                            (1.4714143e-4 +
                                temp * (-9.671989000000001e-7 + temp * (-3.2607217e-8 + temp * -3.8598073e-10))));
            npol = Math.pow(npol, 4.0);
            npol = 15.13 / npol;
            return npol;
        } else {
            let ppol =
                temp *
                (4.9618922e-7 +
                    temp * (-6.1059365e-9 + temp * (3.9401551e-11 + temp * (-1.2588129e-13 + temp * 1.668828e-16))));
            ppol = 1 + temp * (3.6182989e-3 + temp * (-1.3603273e-5 + ppol));
            ppol = 29.93 / ppol ** 4 + 0.96 * temp - 14.8;
            return ppol;
        }
    }
}

function satlift(pressure, potentialTemperature) {
    if (Math.abs(pressure - 1000.0) - 0.001 <= 0) return potentialTemperature;
    const pwrp = (pressure / 1000.0) ** ROCP;
    let t1 = (potentialTemperature + zeroCelsiusInKelvin) * pwrp - zeroCelsiusInKelvin;
    let e1 = wobf(t1) - wobf(potentialTemperature);
    let rate = 1;
    let t2 = t1 - e1 * rate;
    let e2 = (t2 + zeroCelsiusInKelvin) / pwrp - zeroCelsiusInKelvin;
    e2 += wobf(t2) - wobf(e2) - potentialTemperature;
    let eor = e2 * rate;
    while (Math.abs(eor) - 0.1 > 0) {
        rate = (t2 - t1) / (e2 - e1);
        t1 = t2;
        e1 = e2;
        t2 = t1 - e1 * rate;
        e2 = (t2 + zeroCelsiusInKelvin) / pwrp - zeroCelsiusInKelvin;
        e2 += wobf(t2) - wobf(e2) - potentialTemperature;
        eor = e2 * rate;
    }
    return t2 - eor;
}

function dryLift(pressure, temperature, dewPoint) {
    const newTemperature = lclTemp(temperature, dewPoint);
    const newPressure = thalvl(potentialTemp(pressure, temperature), newTemperature);
    return [newPressure, newTemperature];
}

function lclTemp(temperature, dewPoint) {
    const difference = temperature - dewPoint;
    const delta =
        difference *
        (1.2185 + 0.001278 * temperature + difference * (-0.00219 + 1.173e-5 * difference - 0.0000052 * temperature));
    return temperature - delta;
}

function thalvl(potentialTemperature, temperature) {
    const tempKelvin = temperature + zeroCelsiusInKelvin;
    const potentialTempKelvin = potentialTemperature + zeroCelsiusInKelvin;
    return 1000 / (potentialTempKelvin / tempKelvin) ** (1 / ROCP);
}

function celsiusToKelvin(temperature) {
    return temperature + zeroCelsiusInKelvin;
}

function aboveGroundLevel(lowestHeight, desired_height) {
    return desired_height - lowestHeight;
}

function interpHeight(data, targetPressure) {
    if (Array.isArray(targetPressure)) {
        const interpHeights = Array(0);
        for (let i = 0; i < targetPressure.length; i++) {
            interpHeights.push(interpHeight(data, targetPressure[i]));
        }
        return interpHeights;
    } else {
        const logPressures = Array(data.length);
        const reverseHeights = Array(data.length);
        for (let i = data.length - 1; i > -1; i--) {
            logPressures[i] = Math.log10(data[data.length - i - 1][0]);
            reverseHeights[i] = data[data.length - i - 1][1];
        }
        return genericInterpPres(Math.log10(targetPressure), logPressures, reverseHeights);
    }
}

function interpDewPoint(data, targetPressure) {
    if (Array.isArray(targetPressure)) {
        const interpDewPoints = Array(0);
        for (let i = 0; i < targetPressure.length; i++) {
            interpDewPoints.push(interpDewPoint(data, targetPressure[i]));
        }
        return interpDewPoints;
    } else {
        const logPressures = Array(data.length);
        const reverseDewPoints = Array(data.length);
        for (let i = data.length - 1; i > -1; i--) {
            logPressures[i] = Math.log10(data[data.length - i - 1][0]);
            reverseDewPoints[i] = data[data.length - i - 1][3];
        }
        return genericInterpPres(Math.log10(targetPressure), logPressures, reverseDewPoints);
    }
}

function interpTemp(data, targetPressure) {
    if (Array.isArray(targetPressure)) {
        const interpTemperatures = Array(0);
        for (let i = 0; i < targetPressure.length; i++) {
            interpTemperatures.push(interpTemp(data, targetPressure[i]));
        }
        return interpTemperatures;
    } else {
        const logPressures = Array(data.length);
        const reverseTemps = Array(data.length);
        for (let i = data.length - 1; i > -1; i--) {
            logPressures[i] = Math.log10(data[data.length - i - 1][0]);
            reverseTemps[i] = data[data.length - i - 1][2];
        }
        return genericInterpPres(Math.log10(targetPressure), logPressures, reverseTemps);
    }
}

function temperatureAtMixRatio(mixRatio, pressure) {
    if (Array.isArray(pressure)) {
        const temperaturesAtMixRatio = Array(0);
        for (let i = 0; i < pressure.length; i++) {
            temperaturesAtMixRatio.push(temperatureAtMixRatio(mixRatio, pressure[i]));
        }
        return temperaturesAtMixRatio;
    } else {
        let x = Math.log10((mixRatio * pressure) / (622.0 + mixRatio));
        x = 10 ** (c1 * x + c2) - c3 + c4 * (10 ** (c5 * x) - c6) ** 2 - zeroCelsiusInKelvin;
        return x;
    }
}

function meanThetae(data, pbot = null, ptop = null, exact = false) {
    if (pbot == null) {
        pbot = data[0][0];
    }
    if (ptop == null) {
        ptop = data[0][0] - 100;
    }
    if (exact) {
        throw Error;
    } else {
        const dp = -1;
        const p = Array(0);
        for (let i = pbot; i > ptop + dp; i--) {
            p.push(i);
        }
        const thetae = interpThetae(data, p);
        let count = 0;
        let sum = 0;
        for (let i = 0; i < thetae.length; i++) {
            for (let j = 0; j < p[i]; j++) {
                sum += thetae[i];
                count++;
            }
        }
        return sum / count;
    }
}

function interpThetae(data, targetPressure) {
    if (Array.isArray(targetPressure)) {
        const interpThetaes = Array(0);
        for (let i = 0; i < targetPressure.length; i++) {
            interpThetaes.push(interpThetae(data, targetPressure[i]));
        }
        return interpThetaes;
    } else {
        const thetaeValues = calcThetae(data);
        const logPressures = Array(data.length);
        const reverseThetaes = Array(data.length);
        for (let i = data.length - 1; i > -1; i--) {
            logPressures[i] = Math.log10(data[data.length - i - 1][0]);
            reverseThetaes[i] = thetaeValues[data.length - i - 1];
        }
        return genericInterpPres(Math.log10(targetPressure), logPressures, reverseThetaes);
    }
}

function calcThetae(data) {
    const thetae = Array(0);
    for (let i = 0; i < data.length; i++) {
        thetae.push(celsiusToKelvin(findThetae(data[i][0], data[i][2], data[i][3])));
    }
    return thetae;
}

function findThetae(pres, temp, dewPoint) {
    const processedData = dryLift(pres, temp, dewPoint);
    return potentialTemp(100, wetLift(processedData[0], processedData[1], 100), 1000);
}

function cTotals(data) {
    return interpDewPoint(data, 850) - interpTemp(data, 500);
}

function vTotals(data) {
    return interpTemp(data, 850) - interpTemp(data, 500);
}

function wetbulb(pressure, temperature, dewPoint) {
    const processedData = dryLift(pressure, temperature, dewPoint);
    return wetLift(processedData[0], processedData[1], pressure);
}

// module.exports = calculateIndices(), calculateKIndex(), calculateTotalTotals(), calculateDCAPE();
