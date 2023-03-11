import React, { useState } from "react";
import { Box, Container, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Settings } from "@mui/icons-material";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const theme = useTheme();
  const shadow =
    theme.palette.mode === "dark"
      ? "0px 15px 30px rgba(255,255,255,.01)"
      : "0px 15px 30px rgba(0,0,0,.1)";
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box
        component="h4"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "60px",
          height: "60px",
          backgroundColor: "#888",
          borderRadius: "50%",
          position: "fixed",
          bottom: "20px",
          right: "40px",
          margin: 0,
          zIndex: 1,
          cursor: "pointer",
        }}
        onClick={() => setShowSidebar(true)}
      >
        <Settings fontSize="inherit" sx={{ color: "#fff" }} />
      </Box>
      <Container minwidth="true">
        <Box
          component="header"
          width="100%"
          sx={{
            position: "fixed",
            zIndex: 3,
            top: 0,
            left: 0,
            boxShadow: shadow,
            backgroundColor: colors.primary[900],
          }}
        >
          <Container minwidth="true">
            <Navbar />
          </Container>
        </Box>
        <Sidebar show={showSidebar} setShow={setShowSidebar} />
        <main style={{ padding: "100px 0px" }}>{children || <Outlet />}</main>
      </Container>
    </>
  );
};

export default Layout;
