import React from 'react'
import { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css';

function PaletteInfoForm (props) {
  const [newPaletteName, setNewPaletteName] = useState('');
  const [stage, setStage] = useState('form');

  useEffect(
    () => {
      ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
        props.palettes.every(
          ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        )
      )
    },
    [newPaletteName, props.palettes]
  );

  const showEmojiPicker = function () {
    setStage('emoji');
  }

  const savePalette = function (emoji) {
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native
    };
    props.handleSubmit(newPalette);
    setStage('');
  }

  return (
    <div>
      <Dialog 
        open={stage === 'emoji'} 
        onClose={props.handleClose}>
                  <DialogTitle id='form-dialog-title'>Choose an emoji</DialogTitle>

        <Picker onSelect={savePalette} title="Pick an emoji for your Palette" />
      </Dialog>
      <Dialog
        open={stage === 'form'}
        onClose={props.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Save Palette</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a unique palette name to save your beautiful new
              palette
            </DialogContentText>

            <TextValidator
              label='Palette name'
              fullWidth
              margin='normal'
              value={newPaletteName}
              onChange={e => setNewPaletteName(e.target.value)}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Enter palette name',
                'This palette name is already used'
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color='primary'>
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Save
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  )
}

export default PaletteInfoForm
