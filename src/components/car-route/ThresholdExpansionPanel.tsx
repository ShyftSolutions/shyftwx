import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import ThresholdInput from './ThresholdInput';
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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
    sliderValues
}) => {
    const classes = useStyles();

    const [values, setValues] = React.useState<number[]>(sliderValues || []);
    const [expanded, setExpanded] = React.useState(false);
    const [active, setActive] = React.useState(sliderValues?.length !== 0);

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
                        <ThresholdInput impact={weatherImpact} sliderValues={values} action={setValues} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
};
