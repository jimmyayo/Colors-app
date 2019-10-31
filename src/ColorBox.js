import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import chroma from 'chroma-js';

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
        const {name, background, paletteId, id, showLink} = this.props;
        const {showingOverlay} = this.state;
        const isDark = chroma(background).luminance() <= 0.065;
        const isLight = chroma(background).luminance() >= 0.065;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background: background}} className="ColorBox">
                    <div 
                        style={{background: background}} 
                        className={`copy-overlay  ${showingOverlay && "show"}`} 
                    />
                    <div className={`copy-msg  ${showingOverlay && "show"}`}>
                        <h1>Copied!</h1>
                        <p className={`${isLight && "dark-text"}`}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={
                                isDark && "light-text"
                            }>{name}</span>
                        </div>
                        <button className={`copy-button ${isLight && "dark-text"}`}>Copy</button>
                    </div>
                    {showLink && 
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={`see-more ${isLight && "dark-text"}`}>MORE</span>
                        </Link>
                    }
                    
                    
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;