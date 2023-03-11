import { useContext } from "react";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { routes } from "./pages/routes";
import { MovieContext } from "./context/movieContext";

function App() {
  const allpages = useRoutes(routes);
  const { mode, setMode } = useContext(MovieContext);
  const [theme, colorMode] = useMode({ mode, setMode });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Typography color="primary" variant="h3">
          {allpages}
        </Typography>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
