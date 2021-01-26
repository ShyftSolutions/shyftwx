import React from 'react';
/**
 * Creates a material UI slider with marks and props based on the values
 * passed in through the options prop
 *
 * @param options array of objects consisting of a value and a label property
 * @param action function to be executed when a change occurs on the slider
 * @param selected the current selected value on the slider based on parent component
 * @param increase, direction of the vertical slider (true if slider increases bottom to top, false if decreases bottom to top)
 */
export declare const VerticalSlider: React.FC<VerticalSliderProps>;
export default VerticalSlider;
