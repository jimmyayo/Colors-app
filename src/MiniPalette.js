import React from 'react';
import { withStyles } from '@material-ui/styles';

const style = {
    main: {
        backgroundColor: "purple",
        border: "3px solid yellow",
        "& h1": {
            color: "white"
        }
    },
    second: {
        backgroundColor: "pink",

    }
}

function MiniPalette(props) {
    const {classes} = props;
    console.log(classes);

    return (
        <div className={classes.main}>
            <h1>Mini Palette</h1>
        </div>
    );
}

export default withStyles(style)(MiniPalette);