import React from 'react';
import SimpleSelect from '../dropdown/SimpleSelect';

/**
 * Creates a Material UI Grid Item for the Region button group and a label
 *
 * @param options string[] containing the list of options in the buttons
 * @param label text displayed above the product
 */
export const RegionSelector: React.FC<RegionSelectorProps> = ({ options, label = 'Region' }) => {
    const handleClick = (index: string) => {};
    const classes = useStyles();

    const handleClick = (index: string) => {
        console.log(index);
    };

    return <SimpleSelect choices={options} action={handleClick} label={label} />;
};

export default RegionSelector;
