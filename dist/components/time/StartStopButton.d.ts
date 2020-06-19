import React from 'react';
/**
 * Creates two buttons (play and pause) using material ui. When the button is clicked,
 * the button switches to the other button. 'useTimer' hook creates a timer to keep track of
 * whether or not the button is playing/paused, and a useEffect calls onToggle for every new tick
 *
 * @param onToggle function to be called when tick changes values
 */
export declare const StartStopButton: React.FC<TimeActivationButtonProps>;
export default StartStopButton;
