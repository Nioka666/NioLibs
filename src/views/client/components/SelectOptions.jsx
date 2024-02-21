import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectOptions({ selectedValue, handleChange }) {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 270 }}>
        <InputLabel id="demo-simple-select-helper-label">
          Lama Pinjam (Hari)
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedValue}
          label="Lama Pinjam (Hari)"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Lama Pinjam (Hari)</em>
          </MenuItem>
          <MenuItem value={3}>3 Day</MenuItem>
          <MenuItem value={5}>5 Day</MenuItem>
          <MenuItem value={7}>7 Day</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
