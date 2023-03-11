import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loading = ({ size, marginTop }) => {
  return (
    <Box width="100%" display="flex" justifyContent="center" mt={marginTop}>
      <CircularProgress
        size={size}
        width="150px"
        height="150px"
        color="secondary"
      />
    </Box>
  );
};

export default Loading;
