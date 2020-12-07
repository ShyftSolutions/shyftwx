import React from 'react';
import DateFnsUtils from '@date-io/moment';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export const TimeSelector: React.FC<TimeSelectorProps> = ({ action, value }) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(value || null);

    if (selectedDate === null) {
        setSelectedDate(new Date());
        action(new Date());
    }

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
