import React from 'react';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Button from '@material-ui/core/Button';

export default function BackButton() {
    return (
        <Button variant="contained" color="primary">
            <ArrowLeftIcon />
        </Button>
    );
}