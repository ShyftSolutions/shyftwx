import React from 'react';
import DateFnsUtils from '@date-io/moment';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export const TimeSelector = () => {
    const [selectedDate, handleDateChange] = React.useState<Date | null>(new Date());

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
                placeholder="08:00 AM"
                mask="__:__ _M"
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
                fullWidth
            />
        </MuiPickersUtilsProvider>
    );
};

export default TimeSelector;
