import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export default function ForwardButton() {
    return (
        <Button variant="contained" color="primary">
            <ArrowRightIcon />
        </Button>
    );
}