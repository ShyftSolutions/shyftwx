import { createSliderWithTooltip, Range } from 'rc-slider';
import React from 'react';
import { Grid } from '@material-ui/core';
import 'rc-slider/assets/index.css';

const ShyftRange = createSliderWithTooltip(Range);

export const ThresholdSlider: React.FC<ThresholdSliderProps> = ({
    min,
    max,
    units,
    values,
    key,
    onChange,
    onAfterChange,
    isGreaterThan
}) => {
    const handleRangeChange = (incomingValues: number[]) => {
        if (incomingValues[0] !== min || incomingValues[3] !== max) {
            incomingValues[0] = min;
            incomingValues[3] = max;
            return;
        }

        const newValues = incomingValues.slice(1, 3);

        onChange(newValues);
    };

    const applyWxData = (data: any) => {
        onAfterChange && onAfterChange(data);
    };

    let trackStyle = [
        { backgroundColor: '#51CF66', height: 8 },
        { backgroundColor: '#FF922B', height: 8 },
        { backgroundColor: '#FF0000', height: 8 }
    ];

    if (!isGreaterThan) {
        trackStyle = [
            { backgroundColor: '#FF0000', height: 8 },
            { backgroundColor: '#FF922B', height: 8 },
            { backgroundColor: '#51CF66', height: 8 }
        ];
    }

    console.log('rerendering a slider yo', values);

    return (
        <Grid container>
            <Grid item md={8}>
                <ShyftRange
                    min={min}
                    max={max}
                    defaultValue={[min, ...values, max]}
                    value={[min, ...values, max]}
                    step={1}
                    pushable
                    key={key}
                    style={{ width: '145%' }}
                    tipFormatter={(value: number) => `${value}${units}`}
                    trackStyle={trackStyle}
                    onChange={handleRangeChange}
                    onAfterChange={applyWxData}
                    handleStyle={{
                        border: 'solid 2px #329af0',
                        height: 16,
                        width: 16,
                        marginLeft: -3,
                        marginTop: -4,
                        backgroundColor: '#329af0'
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default ThresholdSlider;
