import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { palette } from '@material-ui/system';
import MiniPalette from './MiniPalette';

class PaletteList extends Component {
    render() {
        const {palettes} = this.props;
        console.log(palettes);

        return (
            <div>
                <h1>react colors</h1>

                {palettes.map(p => (
                   <MiniPalette {...p} />
                ))}
            </div>
        )
    }
}

export default PaletteList;