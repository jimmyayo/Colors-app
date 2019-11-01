import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import { palette } from '@material-ui/system';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';


class PaletteList extends Component {

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }

    render() {
        const {palettes, classes} = this.props;
        console.log(palettes);

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>react colors</h1>
                        <Link to="/palette/new">New Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(p => (
                            <MiniPalette {...p} handleClick={() => this.goToPalette(p.id)} />
                        ))}
                    </div>
                </div>

                
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);