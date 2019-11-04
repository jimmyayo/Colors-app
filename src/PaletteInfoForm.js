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
  const [open, setOpen] = React.useState(false);
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
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Save Palette</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Enter Palette Name
          </DialogContentText> */}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PaletteInfoForm;