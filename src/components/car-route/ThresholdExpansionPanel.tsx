import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import ThresholdInput from './ThresholdInput';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0
        }
    })
);

export const ThresholdExpansionPanel: React.FC<ThresholdExpansionPanelProps> = ({
    summary,
    weatherImpact,
    sliderValues,
    onSliderValueChange,
    onUnitChange
}) => {
    const classes = useStyles();

    const [values] = React.useState<Threshold>(sliderValues || { greaterThan: true, threshold: [], unit: '' });
    const [expanded, setExpanded] = React.useState(false);
    const [active, setActive] = React.useState(sliderValues?.threshold.length !== 0);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    const addImpact = () => {
        setActive(true);
    };

    if (!active) {
        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={false} onChange={addImpact}>
                    <ExpansionPanelSummary expandIcon={<AddIcon />}>
                        <Typography className={classes.heading}>{summary}</Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={expanded} onChange={handleChange}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>{summary}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ThresholdInput
                            impact={weatherImpact}
                            sliderValues={values}
                            action={onSliderValueChange}
                            unitAction={onUnitChange}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
};
