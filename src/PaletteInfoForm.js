import React from 'react';
import { useState, useEffect } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function PaletteInfoForm(props) {
  const [open, setOpen] = React.useState(true);
  const [newPaletteName, setNewPaletteName] = useState("");
  
  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
        props.palettes.every(
            ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [newPaletteName]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

  return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Save Palette</DialogTitle>
        <ValidatorForm 
            onSubmit={() => {props.handleSubmit(newPaletteName)}}>
          <DialogContent>
            <DialogContentText>
              Please enter a unique palette name to save your beautiful new palette
            </DialogContentText>
            
                <TextValidator 
                  label="Palette name" 
                  fullWidth
                  margin="normal"
                  value={newPaletteName} 
                  onChange={ e => setNewPaletteName(e.target.value)}
                  validators={['required', 'isPaletteNameUnique']}
                  errorMessages={['Enter palette name', 'This palette name is already used']} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">Save</Button>
          </DialogActions>
        
        </ValidatorForm>
      </Dialog>
  );
}

export default PaletteInfoForm;