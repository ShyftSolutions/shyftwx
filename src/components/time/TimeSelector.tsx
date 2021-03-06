import DateFnsUtils from '@date-io/moment';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';

export const TimeSelector: React.FC<TimeSelectorProps> = ({ action, value }) => {
    const [selectedDate, setSelectedDate] = React.useState<Date>(value || new Date());

    const onChange = (date) => {
        setSelectedDate(date);
        action(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
                placeholder="08:00 AM"
                mask="__:__ _M"
                value={selectedDate}
                onChange={(date) => onChange(date)}
                fullWidth
            />
        </MuiPickersUtilsProvider>
    );
};

export default TimeSelector;
