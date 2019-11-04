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
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import PaletteFormNav from './PaletteFormNav';


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


const NewPaletteForm = (props) => {
    // Default props w/ Hooks:
    const { maxColors = 20} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [currentColor, setCurrentColor] = useState("teal");
    const [colors, setColors] = useState(props.palettes[0].colors);
    const [newColorName, setnewColorName] = useState("");

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

    const addRandomColor = () => {
        //pick random color from all existing palettes
        const allColors = props.palettes.map(p => 
            p.colors).flat();
        
        let rand = Math.floor(Math.random() * allColors.length );
        const randColor = allColors[rand];
        setColors(colors.concat(randColor));
    }

     // function for sorting ColorBoxes
    const onSortEnd = ({oldIndex, newIndex}) => {
        setColors(arrayMove(colors, oldIndex, newIndex));
    };

    const paletteFull = (colors.length >= maxColors);

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
    
    
    const handleSubmit = (paletteName) => {
        console.log(paletteName);

        const newPalette = {
            paletteName: paletteName,
            id: paletteName.toLowerCase().replace(/ /g, "-"),
            colors: colors
        }

        props.savePalette(newPalette);
        props.history.push('/');
    }
    

    return (
        <div className={classes.root}>

        <PaletteFormNav
            open={open}
            classes={classes}
            palettes={props.palettes}
            handleSubmit={handleSubmit}
            handleDrawerOpen={handleDrawerOpen} />

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
                <Button variant="contained" color="secondary" onClick={() => setColors([])}>
                    Clear palette
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    disabled={paletteFull}
                    onClick={addRandomColor}>
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
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    disabled={paletteFull}
                    style={{backgroundColor: paletteFull ? "grey" : currentColor}} >

                    {paletteFull ? "Palette is full" : "Add Color"}

                </Button>
                
            </ValidatorForm>
            
        </Drawer>
        <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
                <DraggableColorList 
                    onSortEnd={onSortEnd} 
                    axis={'xy'} 
                    colors={colors} 
                    removeColor={removeColor} />
        </main>
        </div>
    );
}

export default NewPaletteForm;