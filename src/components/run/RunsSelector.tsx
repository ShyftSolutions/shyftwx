import SimpleSelect from '../dropdown/SimpleSelect';
import React from 'react';
import moment from 'moment';

/**
 * Creates a Material UI Grid Item for the Region button group or dropdown menu
 *
 * @param options string[] of options for the button group
 * @param label text displayed over the button group
 * @param action
 */
export const RunsSelector: React.FC<RunsSelectorProps> = ({ options, label = 'Run', action }) => {
    const newOptions = options.map((option) => moment.unix(option).utc().format('YYYY-MM-DD[T] hh:mm[Z]'));

    return <SimpleSelect choices={newOptions} action={action} label={label} />;
};

export default RunsSelector;
