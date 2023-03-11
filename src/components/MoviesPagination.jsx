import React, { useContext } from "react";
import { Box, Pagination } from "@mui/material";
import { MovieContext } from "../context/movieContext";

const MoviesPagination = ({ defaultPage, setCurrentPage }) => {
  const { totalPages, screenSize } = useContext(MovieContext);
  return (
    <Box component="div" display="flex" justifyContent="center">
      <Pagination
        defaultPage={defaultPage}
        count={totalPages}
        showFirstButton={screenSize > 600 ? true : false}
        showLastButton={screenSize > 600 ? true : false}
        color="secondary"
        shape="rounded"
        size={screenSize > 900 ? "large" : "small"}
        onChange={(_, page) => setCurrentPage(page)}
        sx={{
          size: "large",
          display: "flex",
          justifyContent: "center",
          margin: "50px",
        }}
      />
    </Box>
  );
};

export default MoviesPagination;
