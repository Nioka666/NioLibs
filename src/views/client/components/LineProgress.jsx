import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LineProgress() {
  return (
    <Box sx={{ width: "100%", position: "fixed", zIndex: "999" }}>
      <LinearProgress color="success" />
    </Box>
  );
}
