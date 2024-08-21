import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

function Ratings({ size, top, left }) {
  const [value, setValue] = React.useState(4);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        marginTop: top,
        marginLeft: left
      }}
    >
      {/* <Typography component="legend">Controlled</Typography> */}
      <Rating
        name="simple-controlled"
        value={value}
        size={size}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      {/* <Typography component="legend">Read only</Typography> */}
      {/* <Rating name="read-only" value={value} readOnly /> */}
      {/* <Typography component="legend">Disabled</Typography> */}
      {/* <Rating name="disabled" value={value} disabled /> */}
      {/* <Typography component="legend">No rating given</Typography> */}
      {/* <Rating name="no-value" value={null} /> */}
    </Box>
  );
}

export default Ratings;
