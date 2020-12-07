import React from 'react';
export interface DialogTitleProps {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}
export declare const TimeChart: React.FC<TimeChartProps>;
export default TimeChart;
