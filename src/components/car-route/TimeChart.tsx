import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {
    Button,
    Dialog,
    DialogContent,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    tableCell: {
        border: '2px solid white',
        width: '35px'
    },
    icon: {
        fontSize: '1.5em',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1em'
        }
    }
}));

const green = '#51CF66';
const yellow = '#FFDE53';
const red = '#FF5C5C';

export interface DialogTitleProps {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = (props: DialogTitleProps) => {
    const classes = useStyles();
    const { children, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
};

export const TimeChart: React.FC<TimeChartProps> = ({ data, thresholds }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const icons = {
        Temperature: <FontAwesomeIcon className={classes.icon} icon={fas.faTemperatureLow} />,
        TotalPrecipitationRate: <FontAwesomeIcon className={classes.icon} icon={fas.faCloudShowersHeavy} />,
        WindSpeed: <FontAwesomeIcon className={classes.icon} icon={fas.faWind} />
    };

    const getFormattedTime = (time: string) => {
        const hour: number = Number(time.substring(11, 13));

        if (hour === 12) {
            return '12:00 PM';
        } else if (hour > 12) {
            return `${hour - 12}:00 PM`;
        } else if (hour === 0) {
            return '12:00 AM';
        } else {
            return `${hour}:00 AM`;
        }
    };

    const getColorAndIcons = (leg) => {
        // default
        let overallColor = green;
        const features = { '#FF5C5C': [] as string[], '#FFDE53': [] as string[], '#51CF66': [] as string[] };

        Object.keys(leg.featureValues).forEach((featureValueKey) => {
            const featureValue = leg.featureValues[featureValueKey];
            // i.e. 32.0 for "Temperature"
            const legFeatureValue = featureValue.value;

            const isGreaterThan = thresholds[featureValue.name].greaterThan;
            const firstThreshold = thresholds[featureValue.name].threshold[0];
            const secondThreshold = thresholds[featureValue.name].threshold[1];

            if (isGreaterThan) {
                if (legFeatureValue > secondThreshold) {
                    overallColor = red;
                    features['#FF5C5C'].push(featureValue.name);
                } else if (legFeatureValue > firstThreshold && overallColor !== red) {
                    overallColor = yellow;
                    features['#FFDE53'].push(featureValue.name);
                }
            } else {
                if (legFeatureValue < firstThreshold) {
                    overallColor = red;
                    features['#FF5C5C'].push(featureValue.name);
                } else if (legFeatureValue < secondThreshold && overallColor !== red) {
                    overallColor = yellow;
                    features['#FFDE53'].push(featureValue.name);
                }
            }
        });

        return { color: overallColor, icons: features[overallColor] };
    };

    const table = (
        <TableContainer>
            <Table aria-label="departure times chart">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Departure</TableCell>
                        {data[0].tripData.map((leg, i) => (
                            <TableCell align="center" key={i}>
                                {i}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((trip, i) => (
                        <TableRow key={i}>
                            <TableCell className={classes.tableCell}>{getFormattedTime}</TableCell>
                            {trip.tripData.map((route) => {
                                const colorAndIcons = getColorAndIcons(route);
                                return (
                                    <TableCell
                                        key={i}
                                        className={classes.tableCell}
                                        style={{ backgroundColor: colorAndIcons.color }}
                                    >
                                        {colorAndIcons.icons !== undefined
                                            ? colorAndIcons.icons.map((icon) => icons[icon])
                                            : ' '}
                                    </TableCell>
                                );
                            })}
                            <TableCell className={classes.tableCell} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Explore More Times
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Alternative Departure Times
                </DialogTitle>
                <DialogContent>{table}</DialogContent>
            </Dialog>
        </div>
    );
};

export default TimeChart;