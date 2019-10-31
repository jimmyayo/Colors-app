import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {
            format: "hex"
        }
        this.changeFormat = this.changeFormat.bind(this);
    }

    gatherShades(palette, seekColor) {
        //return all shades of current color
        let shades = [];
        let allColors = palette.colors;

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === seekColor)
            );
        }

        return shades.slice(1);
    }
    
    changeFormat(val) {
        this.setState({ format: val});
    }

    render() {
        const {paletteName, emoji, id} = this.props.palette;
        const {format} = this.state;
        const colorBoxes = this._shades.map(
            color => (
                <ColorBox 
                    key={color.name}
                    name={color.name}
                    background={color[format]}
                    showLink={false}
                    />
            )
        )
        return (
            <div className="SingleColorPalette Palette">
                <Navbar handleFormatChange={this.changeFormat}
                    showAllColors={false} />
                <div className="Palette-colors">
                    {colorBoxes}
                    
                    <div className="go-back ColorBox">
                        <Link to={`/palette/${id}`} className="back-button">GO BACK </Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default SingleColorPalette;