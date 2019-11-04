import React from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    height: "64px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  navBtns: {

  }
}));

const PaletteFormNav = function(props) {
  const classes = useStyles();

  const {open} = props;
  const [newPaletteName, setNewPaletteName] = useState("");
  
  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
        props.palettes.every(
            ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [newPaletteName]);

  return (
    <div className={classes.root}>
      <CssBaseline />
        <AppBar
            position="fixed"
            color="default"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                Create Palette
            </Typography>
            
            </Toolbar>
            <div className={classes.navBtns}>
              <ValidatorForm 
                onSubmit={() => {props.handleSubmit(newPaletteName)}}>
                  <TextValidator 
                      label="Palette name" 
                      value={newPaletteName} 
                      onChange={ e => setNewPaletteName(e.target.value)}
                      validators={['required', 'isPaletteNameUnique']}
                      errorMessages={['Enter palette name', 'This palette name is already used']} />
                  <Button variant="contained" color="primary" type="submit">Save Palette</Button>
              </ValidatorForm>
              <Link to="/">
                <Button variant="contained" color="secondary" type="button">Go back</Button>
              </Link>
            </div>
        </AppBar>
    </div>
  )
}

export default PaletteFormNav;