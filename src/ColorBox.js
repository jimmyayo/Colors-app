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
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px"
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s ease-in-out",
        transform: "scale(0.1)"
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute"
    },
    copyMessage: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
        transform: "scale(0.1)",
        opacity: "0",
        color: "white",
        flexDirection: "column"
    },
    showCopyMessage: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "20",
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s",
        "& h1": {
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255, 255, 255, 0.3)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase"
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "100"
        }
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