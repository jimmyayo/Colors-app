import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';

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
        const {classes} = this.props;
        const {format} = this.state;
        const colorBoxes = this._shades.map(
            color => (
                <ColorBox 
                    key={color.name}
                    name={color.name}
                    background={color[format]}
                    showingFullPalette={false}
                    />
            )
        )
        return (
            <div className={classes.Palette}>
                <Navbar handleFormatChange={this.changeFormat}
                    showAllColors={false} />
                <div className={classes.colors}>
                    {colorBoxes}
                    
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} >GO BACK </Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);