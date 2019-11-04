import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

const ColorPickerForm = function(props) {
  const {paletteFull, addColor, colors} = props;
  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setnewColorName] = useState("");
  
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

  const handleSubmit = function() {
    addColor(currentColor, newColorName);
    setnewColorName("");
  };

  const handleColorChange = function(newColor) {
    const r = newColor.rgb.r;
    const g = newColor.rgb.g;
    const b = newColor.rgb.b;
    const a = newColor.rgb.a;
    const rgbaColor = `rgba(${r},${g},${b},${a})`;

    setCurrentColor(rgbaColor);
  }

  return (
    <div>
      <ChromePicker 
        color={currentColor}
        onChangeComplete={handleColorChange} />
      <ValidatorForm onSubmit={handleSubmit}>
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
    </div> 
  )
}

export default ColorPickerForm;