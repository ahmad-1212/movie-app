import { Backdrop, Typography, useTheme, Switch, Box } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { AnimatePresence, motion } from "framer-motion";
import { Close } from "@mui/icons-material";
import { ColorModeContext } from "../../theme";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext";

// move sidebar to left animation

const sidebarVariant = {
  hidden: { x: "100vw", transition: { duration: 0.3 } },
  visible: {
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Sidebar = ({ show, setShow }) => {
  const { toggleColorMode } = useContext(ColorModeContext);
  const { mode } = useContext(MovieContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const checked = mode === "light" ? true : false;

  return (
    <>
      <Backdrop
        onClick={() => setShow(false)}
        open={show}
        transitionDuration={300}
        sx={{ zIndex: "99" }}
      />
      <AnimatePresence>
        {show && (
          <motion.div
            variants={sidebarVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ backgroundColor: colors.primary[800], zIndex: 200 }}
            className="sidebar"
          >
            <Typography
              variant="h4"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              fontWeight="bold"
              p="20px"
              sx={{ borderBottom: `1px solid ${colors.primary[700]}` }}
            >
              <span>Setting</span>
              <span
                onClick={() => setShow(false)}
                style={{ cursor: "pointer" }}
              >
                <Close fontSize="inherit" />
              </span>
            </Typography>
            <Typography
              variant="h4"
              mt="40px"
              fontWeight="bold"
              textAlign="center"
            >
              Switch Mode
            </Typography>
            <Box
              component="div"
              display="flex"
              gap="10px"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                display="inline-block"
                mt="5px"
              >
                Light Mode
              </Typography>
              <span>
                <Switch
                  color="secondary"
                  checked={checked}
                  onChange={toggleColorMode}
                />
              </span>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
