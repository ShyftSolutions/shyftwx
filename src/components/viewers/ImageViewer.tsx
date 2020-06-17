import React from 'react';
import { makeStyles, CardMedia, Card} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    media: {
        height: '40vw',
        width: '100%'
    }
}));

export const ImageViewer: React.FC<ImageViewerProps> = ({ image }) => {
    const classes = useStyles();
    console.log(image);

    return (
            <CardMedia className={classes.media} image={image} />
    );
};

export default ImageViewer;
