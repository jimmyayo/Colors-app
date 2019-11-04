import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import DraggableColorBox from './DraggableColorBox';


const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function NewPaletteForm(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [currentColor, setCurrentColor] = useState("teal");
    const [colors, setColors] = useState([]);
    const [newColorName, setnewColorName] = useState("");
    const [newPaletteName, setNewPaletteName] = useState("");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const addColor = () => {
        const newColor = {
            color: currentColor,
            name: newColorName
        };

        setColors(colors.concat(newColor));
        setnewColorName("");
    }

    const removeColor = (colorName) => {
        setColors(colors.filter(color => color.name !== colorName));
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
            colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
          )
        );
      }, [newColorName, colors]);

      useEffect(() => {
        ValidatorForm.addValidationRule('isColorUnique', (value) =>
            colors.every(
                ({color}) => color.toLowerCase() !== currentColor.toLowerCase()
          )
        );
      }, [currentColor, colors]);
    
      useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
          )
        );
      }, [newPaletteName]);

    const handleSubmit = () => {
        console.log(newPaletteName);

        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors: colors
        }
        props.savePalette(newPalette);
        props.history.push('/');
    }
    

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
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                New Palette
            </Typography>
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator 
                    label="Palette name" 
                    value={newPaletteName} 
                    onChange={ e => setNewPaletteName(e.target.value)}
                    validators={['required', 'isPaletteNameUnique']}
                    errorMessages={['Enter palette name', 'This palette name is already used']} />
                <Button variant="contained" color="primary" type="submit">Save Palette</Button>
            </ValidatorForm>

            
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <Typography variant="h4">Design Palette</Typography>
            <div>
                <Button variant="contained" color="secondary">
                    Clear palette
                </Button>
                <Button variant="contained" color="primary">
                    Random Color
                </Button>
            </div>

            <ChromePicker 
                color={currentColor}
                onChangeComplete={ (newColor) => setCurrentColor(newColor.hex) } />
            <ValidatorForm onSubmit={addColor}>
                <TextValidator 
                    value={newColorName} 
                    validators={["required", "isColorNameUnique", "isColorUnique"]}
                    errorMessages={["Color name is required", "Color name must be unique", "Color already used"]}
                    onChange={ e => setnewColorName(e.target.value)} />
                
                <Button variant="contained" color="primary" 
                    type="submit"
                    style={{backgroundColor: currentColor}} >
                    Add Color
                </Button>
                
            </ValidatorForm>
            
        </Drawer>
        <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
            
                {colors.map(c => (
                    <DraggableColorBox 
                        color={c.color} 
                        name={c.name} 
                        key={c.name}
                        handleClick={() => removeColor(c.name) } />
                ))}
            
            
        </main>
        </div>
    );
}

export default NewPaletteForm;