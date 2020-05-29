import React from 'react';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';

export const StartStopButton = () => {
    const [state, setState] = React.useState({
        playing: false,
    });

    const handleClick = () => {
        if(state.playing) {
            setState({
                ...state,
                playing: false,
            });
        } else {
            setState({
                ...state,
                playing: true,
            });
        }
    };

    return (
        state.playing ? <PauseButton onClick={handleClick}/> : <PlayButton onClick={handleClick} />
    );
};

export default StartStopButton;
