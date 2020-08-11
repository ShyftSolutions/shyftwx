import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    table: {
        maxWidth: '50%'
        // position: 'absolute',
        // bottom: '15px',
        // left: '350px'
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

export const TimeChart: React.FC<TimeChartProps> = ({ data, thresholds }) => {
    const classes = useStyles();

    const icons = {
        Temperature: <FontAwesomeIcon className={classes.icon} icon={fas.faTemperatureLow} />,
        TotalPrecipitationRate: <FontAwesomeIcon className={classes.icon} icon={fas.faTemperatureLow} />,
        WindSpeed: <FontAwesomeIcon className={classes.icon} icon={fas.faCloudShowersHeavy} />
    };

    const getColor = (leg) => {
        // default
        let overallColor = green;

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
                } else if (legFeatureValue > firstThreshold && overallColor !== red) {
                    overallColor = yellow;
                }
            } else {
                if (legFeatureValue < firstThreshold) {
                    overallColor = red;
                } else if (legFeatureValue < secondThreshold && overallColor !== red) {
                    overallColor = yellow;
                }
            }
        });

        return overallColor;
    };

    return (
        <TableContainer className={classes.table} component={Paper}>
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
                            <TableCell className={classes.tableCell}>
                                {`${trip.startTime.substring(11, 13)}:00`}
                            </TableCell>
                            {trip.tripData.map((route, i) => (
                                <TableCell
                                    key={i}
                                    className={classes.tableCell}
                                    style={{ backgroundColor: getColor(route) }}
                                >

                                </TableCell>
                            ))}
                            <TableCell className={classes.tableCell} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TimeChart;
