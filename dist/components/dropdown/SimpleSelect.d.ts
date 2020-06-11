/// <reference types="react" />
/**
 * Uses Material UI to create a dropdown menu option with
 * the options of the String values in 'options'
 *
 * @param Props: {options: string[]}
 */
export default function SimpleSelect(Props: {
    options: string[];
    action: Function;
}): JSX.Element;
