import React from "react";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Navitem = ({ icon, title, link, margin, clickHandler, fontSize }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const cssProperties = {
    color: colors.primary[400],
    fontSize: fontSize ? fontSize : "16px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginBottom: margin,
  };

  return (
    <NavLink
      to={link}
      onClick={clickHandler}
      style={({ isActive }) =>
        isActive
          ? {
              ...cssProperties,
              fontWeight: "bold",
              color: "inherit",
            }
          : { ...cssProperties }
      }
    >
      <Box component="span" className="menu-icon">
        {icon}
      </Box>
      <Box component="span">{title}</Box>
    </NavLink>
  );
};

export default Navitem;
