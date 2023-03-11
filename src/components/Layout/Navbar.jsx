import { Box, IconButton } from "@mui/material";
import { navlinks } from "../../data/data";
import { NavLink } from "react-router-dom";
import Navitem from "./Navitem";
import { MovieContext } from "../../context/movieContext";
import { useContext, useEffect, useState } from "react";
import { Close, Menu } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";

// Animation
const containerVariant = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const Navbar = () => {
  const { screenSize, setScreenSize } = useContext(MovieContext);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setScreenSize(window.innerWidth);
  }, []);

  return (
    <Box component="div">
      {navlinks.map((item, i) => (
        <Box
          key={i}
          component="nav"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py="18px"
        >
          <NavLink
            to={item.link}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            {item.pageTitle}
          </NavLink>

          {screenSize > 900 ? (
            <Box
              component="div"
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap="20px"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {item.navitems.map((navlink, i) => (
                <motion.div key={i} whileHover={{ scale: 1.2 }}>
                  <Navitem
                    icon={navlink.icon}
                    title={navlink.title}
                    link={navlink.link}
                  />
                </motion.div>
              ))}
            </Box>
          ) : (
            <IconButton
              size="large"
              sx={{ fontSize: "32px" }}
              onClick={() => setShowMenu((prev) => !prev)}
            >
              {!showMenu && <Menu fontSize="inherit" />}
              {showMenu && <Close fontSize="inherit" />}
            </IconButton>
          )}
        </Box>
      ))}
      <AnimatePresence>
        {screenSize < 900 && showMenu && (
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            style={{ overflow: "hidden" }}
            exit="hidden"
            className="hide-scrollbar"
          >
            {navlinks.map((item) => {
              return item.navitems.map((navlink, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, originX: 0 }}
                >
                  <Navitem
                    clickHandler={() => setShowMenu(false)}
                    icon={navlink.icon}
                    title={navlink.title}
                    link={navlink.link}
                    margin="15px"
                  />
                </motion.div>
              ));
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Navbar;
