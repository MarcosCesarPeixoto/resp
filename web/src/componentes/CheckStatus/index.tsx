import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function FormControlLabelPosition() {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" >Status Desejado</FormLabel>
      <FormGroup aria-label="position"  row>
        <FormControlLabel
          value="0"
          control={<Checkbox color="primary" />}
          label="Aguardando"
          labelPlacement="end"
          defaultChecked={true}
          defaultValue={1}
        />
        <FormControlLabel
          value="1"
          control={<Checkbox color="primary" />}
          label="Confirmado"
          labelPlacement="end"
        />
        <FormControlLabel
          value="2"
          control={<Checkbox color="primary" />}
          label="Realizado"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
}
