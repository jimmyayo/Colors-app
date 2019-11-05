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
        const {palettes, classes, deletePalette} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Color Palettes</h1>
                        <Link to="/palette/new">New Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(p => (
                            <MiniPalette 
                                key={p.id} {...p} 
                                id={p.id}
                                handleClick={() => this.goToPalette(p.id)}
                                handleDelete={deletePalette} />
                        ))}
                    </div>
                </div>

                
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);