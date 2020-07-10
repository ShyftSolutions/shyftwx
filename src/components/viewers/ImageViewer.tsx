import React from 'react';
import { makeStyles, CardMedia, Card } from '@material-ui/core';

/**
 * Uses Material UI to display an image
 */
const useStyles = makeStyles((theme) => ({
    media: {
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    }
}));

/**
 * Creates a single image component
 *
 * @param image to be displayed on the cardMedia component
 */
export const ImageViewer: React.FC<ImageViewerProps> = ({ image }) => {
    const classes = useStyles();

    return <img className={classes.media} src={image} alt="weather viewer" />;
};

export default ImageViewer;
