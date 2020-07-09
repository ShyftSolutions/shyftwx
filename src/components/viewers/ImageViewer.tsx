import React from 'react';
import { makeStyles, CardMedia, Card} from '@material-ui/core';

/**
 * Uses Material UI to display an image
 */
const useStyles = makeStyles((theme) => ({
    media: {
        height: '40vw',
        width: '100%'
    }
}));

/**
 * Creates a single image component
 *
 * @param image to be displayed on the cardMedia component
 */
export const ImageViewer: React.FC<ImageViewerProps> = ({ image }) => {
    const classes = useStyles();

    return (
            <CardMedia className={classes.media} image={image} />
    );
};

export default ImageViewer;
