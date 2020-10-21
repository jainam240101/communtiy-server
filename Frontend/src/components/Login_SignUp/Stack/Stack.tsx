/**
 * /* eslint-disable no-use-before-define
 *
 * @format
 */

import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

interface Props {
  name: string;
  dispatch: any;
}
const Stack: React.FC<Props> = ({ dispatch, name }) => {
  const stackChange = (event: any) => {
    console.log(event);
    console.log(name);
    dispatch({ type: "change", value: [...event], name: name });
  };
  return (
    <div>
      <Autocomplete
        multiple
        id='tags-outlined'
        options={top100Films}
        getOptionLabel={(option) => option}
        // defaultValue={[top100Films[13]]}
        onChange={(_, newValue) => stackChange(newValue)}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label='Technology Stack'
            placeholder='Favorites'
          />
        )}
      />
    </div>
  );
};
export default Stack;
const top100Films = ["Docker", "Github", "Machine Learning"];
