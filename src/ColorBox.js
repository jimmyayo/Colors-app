import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background: background}} className="ColorBox">
                    <div 
                        style={{background: background}} 
                        className={`copy-overlay  ${showingOverlay && "show"}`} 
                    />
                    <div className={`copy-msg  ${showingOverlay && "show"}`}>
                        <h1>Copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                    </div>
                    {showLink && 
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className="see-more">More</span>
                        </Link>
                    }
                    
                    
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;