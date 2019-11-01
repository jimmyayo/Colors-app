import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorBoxStyles';


class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { showingOverlay: false};
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({showingOverlay: true},
            () => {
                setTimeout(() => this.setState({showingOverlay: false}), 1500);
            });
    }

    render() {
        const {name, background, paletteId, id, showingFullPalette, classes} = this.props;
        const {showingOverlay} = this.state;
        const isDark = chroma(background).luminance() <= 0.065;
        const isLight = chroma(background).luminance() >= 0.065;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background: background}} className={classes.ColorBox}>
                    <div 
                        style={{background: background}} 
                        className={`${classes.copyOverlay} ${showingOverlay && classes.showOverlay}`} 
                    />
                    <div className={`${classes.copyMessage}  ${showingOverlay && classes.showCopyMessage}`}>
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette && 
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMoreButton }>MORE</span>
                        </Link>
                    }
                    
                    
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);