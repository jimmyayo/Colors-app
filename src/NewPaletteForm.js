import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';


const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
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
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: "100%"
  },
  button: {
      width: "50%"
  }
}));


const NewPaletteForm = (props) => {
    // Default props w/ Hooks:
    const { maxColors = 20} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [colors, setColors] = useState(props.palettes[0].colors);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const addColor = (currentColor, newColorName) => {
        const newColor = {
            color: currentColor,
            name: newColorName
        };

        setColors(colors.concat(newColor));
        //setnewColorName("");
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

    const handleSubmit = (paletteName) => {
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
            <div className={classes.container}>
                <Typography variant="h4" gutterBottom>Design Palette</Typography>
                <div className={classes.buttons}>
                    <Button 
                        className={classes.button}
                        variant="contained" 
                        color="secondary" 
                        onClick={() => setColors([])}>
                        Clear palette
                    </Button>
                    <Button 
                        variant="contained" 
                        className={classes.button}
                        color="primary" 
                        disabled={paletteFull}
                        onClick={addRandomColor}>
                        Random Color
                    </Button>
                </div>

                <ColorPickerForm
                    paletteFull={paletteFull}
                    addColor={addColor}
                    colors={colors} />
            </div>
            
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