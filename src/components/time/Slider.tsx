import React from 'react';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { CssBaseline, Hidden } from '@material-ui/core';

/**
 * Uses Material UI slider to create a responsive time for forecast hours and
 * valid times
 */

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.main,
        height: 20,
        [theme.breakpoints.down('xs')]: {
            marginBottom: 20
        }
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: theme.palette.secondary.light,
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit'
        }
    },
    active: {},
    rail: {
        height: 5,
        borderRadius: 4
    },
    markLabelActive: {
        fontWeight: 700,
        padding: 12
    },
    markLabel: {
        fontWeight: 500,
        padding: 12,
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    mark: {
        backgroundColor: theme.palette.primary.dark,
        height: 5
    }
}));

interface Props {
    children: React.ReactElement;
    open: boolean;
    value: number;
}

/**
 * Component that displays the valid time as a popup above the appropriate knob
 * on the slider component
 *
 * @param children
 * @param open boolean stating whether or not the popup is open
 * @param value displayed on the popup
 */
function ValueLabelComponent(props: Props) {
    const { children, open, value } = props;
    const validTime = moment.unix(value).utc().format('MM/DD HH:mm[Z]');

    return (
        <span>
            <CssBaseline />
            <Hidden smDown>
                <Tooltip open={open} enterTouchDelay={0} title={validTime} placement="top">
                    {children}
                </Tooltip>
            </Hidden>
            <Hidden mdUp>
                <Tooltip open={open} enterTouchDelay={0} title={validTime} placement="bottom">
                    {children}
                </Tooltip>
            </Hidden>
        </span>
    );
}

/**
 * Creates a material UI slider with marks and props based on the values
 * passed in through the options prop
 *
 * @param options array of objects consisting of a value and a label property
 * @param action function to be executed when a change occurs on the slider
 * @param selected the current selected value on the slider based on parent component
 */
export const DiscreteSlider: React.FC<SliderProps> = ({ options, action, selected }) => {
    const classes = useStyles();

    // define the props for the slider based on the options prop
    const optionsCount = React.useRef(options.length);
    const maxValue: number = options[options.length - 1].value;
    const minValue: number = options[0].value;

    const handleChangeCommitted = (e: React.ChangeEvent<{}>, value: number | number[]) => {
        action(value as number);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Hidden xsDown>
                {optionsCount.current >= 16
                    ? options.forEach((option, index) => {
                          if (
                              !(
                                  index === 0 ||
                                  index === optionsCount.current - 1 ||
                                  (index % 4 === 0 && index <= optionsCount.current - 4)
                              )
                          ) {
                              option.label = '';
                          }
                      })
                    : undefined}
                <Slider
                    classes={classes}
                    valueLabelDisplay="auto"
                    aria-label="pretty slider"
                    track={false}
                    step={null}
                    marks={options}
                    max={maxValue}
                    ValueLabelComponent={ValueLabelComponent}
                    onChange={handleChangeCommitted}
                    value={selected}
                    min={minValue}
                />
            </Hidden>
            <Hidden smUp>
                <Slider
                    classes={classes}
                    aria-label="pretty slider"
                    track={false}
                    step={null}
                    marks={options}
                    max={maxValue}
                    onChange={handleChangeCommitted}
                    value={selected}
                    min={minValue}
                />
            </Hidden>
        </div>
    );
};

export default DiscreteSlider;
