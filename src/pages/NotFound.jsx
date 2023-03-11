import { ArrowRightAlt } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/", { replace: true });
  };

  return (
    <Box
      component="div"
      width="100%"
      height="100vh"
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="h4" textAlign="center">
        {" "}
        404 Error! The page you are lookig for is not Found!{" "}
      </Typography>
      <Typography
        variant="h6"
        mt="60px"
        onClick={navigateHandler}
        color="secondary"
        display="flex"
        alignItems="center"
        gap="10px"
        sx={{
          cursor: "pointer",
          "&:hover": {
            scale: 1.1,
          },
        }}
      >
        Return to Home {<ArrowRightAlt size="large" />}
      </Typography>
    </Box>
  );
};

export default NotFound;
