import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles'

const styles = {
    ColorBox: {
        width: "20%",
        height: props => props.showingFullPalette ?  "25%" : "50%",
        margin:" 0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.8px",
        "&:hover button": {
            opacity: 1
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.65 ? "black" : "white"
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.65 ? "white" : "black"
    },
    seeMoreButton: {
        color: props => chroma(props.background).luminance() >= 0.65 ? "rgba(0,0,0,0.5)" : "white",
        background: "rgba( 255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton: {
        color: props => chroma(props.background).luminance() >= 0.65 ? "rgba(0,0,0,0.5)"  : "white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba( 255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        opacity: "0"
    }
}

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
                        className={`copy-overlay  ${showingOverlay && "show"}`} 
                    />
                    <div className={`copy-msg  ${showingOverlay && "show"}`}>
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
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