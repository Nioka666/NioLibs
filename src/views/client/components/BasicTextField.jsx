import * as React from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

export default function BasicTextField({ value, type, placeholder, onChangeValue }) {
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <div>
        <TextField
          id="outlined-start-adornment"
          sx={{
            m: 0.4,
            width: "400px",
          }}
          type={type}
          value={value}
          onChange={onChangeValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{placeholder} : </InputAdornment>
            ),
          }}
        />
      </div>
    </Box>
  );
}
