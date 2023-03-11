import React from "react";
import Loading from "./Loading";
import { Box } from "@mui/material";

const Message = ({ loading, error, size }) => {
  return (
    <>
      {loading && !error && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="250px"
        >
          <Loading size={size} />
        </Box>
      )}
      {!loading && error && (
        <Box
          compoenet="section"
          display="flex"
          justifyContent="center"
          mt="150px"
          textAlign="center"
        >
          {error}
        </Box>
      )}
    </>
  );
};

export default Message;
