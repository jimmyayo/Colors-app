import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import PaletteInfoForm from './PaletteInfoForm';
import useStyles from './styles/PaletteFormNavStyles';

const PaletteFormNav = function (props) {
  const classes = useStyles();
  const { open } = props;
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        color='default'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={props.handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Create Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to='/'>
            <Button
              className={classes.button}
              variant='contained'
              color='secondary'
              type='button'
            >
              Go back
            </Button>
          </Link>

          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={() => setShowForm(true)}
          >
            Save Palette
          </Button>
        </div>
      </AppBar>

      {showForm && (
        <PaletteInfoForm
          palettes={props.palettes}
          handleSubmit={props.handleSubmit}
          handleClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default PaletteFormNav
