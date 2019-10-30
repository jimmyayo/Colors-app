import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
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

    render() {
        const colorBoxes = this._shades.map(
            color => (
                <ColorBox 
                    key={color.name}
                    name={color.name}
                    background={color.hex}
                    showLink={false}
                    />
            )
        )
        return (
            <div className="Palette">
                <h1>Single color palette</h1>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default SingleColorPalette;