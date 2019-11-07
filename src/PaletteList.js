import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { palette } from '@material-ui/system';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteDialog: false,
            deletingId: ''
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    openDialog(id) {
        this.setState({
            openDeleteDialog: true,
            deletingId: id
        });
    }

    closeDialog() {
        this.setState({ openDeleteDialog: false, deletingId: '' });
    }

    handleDelete() {
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog();
    }

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }


    render() {
        const { palettes, classes } = this.props;
        const { openDeleteDialog } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Color Palettes</h1>
                        <Link to="/palette/new">New Palette</Link>
                    </nav>
                    
                    {palettes.length === 0 &&
                        <div className={classes.reloadButton}>
                            <Button
                                variant='contained'
                                color='secondary'
                                type='button'
                                onClick={this.props.reloadPalettes}
                            >
                                Reload starter colors
                        </Button>
                        </div>
                    }


                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(p => (
                            <CSSTransition key={p.id} classNames='fade' timeout={500}>
                                <MiniPalette
                                    key={p.id} {...p}
                                    id={p.id}
                                    handleClick={() => this.goToPalette(p.id)}
                                    openDialog={this.openDialog} />

                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>


                <Dialog open={openDeleteDialog} onClose={this.closeDialog} >
                    <DialogTitle>Delete Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{ background: blue[100], color: blue[600] }}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>Delete</ListItemText>
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ background: red[100], color: red[600] }}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>Cancel</ListItemText>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);