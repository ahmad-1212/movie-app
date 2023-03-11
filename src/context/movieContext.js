import { createContext, useEffect, useState } from "react";
import { GENRIES } from "../constants";
import useHttp from "../hooks/useHttp";

export const MovieContext = createContext({
  screenSize: null,
  setScreenSize: () => {},
  totalPages: null,
  setTotalPages: () => {},
  movieGenries: [],
  tvSeriesGenries: [],
  type: "",
  setMediaTypeHandler: () => {},
  mode: "",
  setMode: () => {},
});

export const MovieContextProivder = ({ children }) => {
  const [screenSize, setScreenSize] = useState(null);
  const [totalPages, setTotalPages] = useState();
  const [movieGenries, setMovieGenries] = useState([]);
  const [tvSeriesGenries, setTvSeriesGenries] = useState([]);
  const [type, setType] = useState("");
  const [mode, setMode] = useState();
  const [sendRequest] = useHttp();

  const setScreenSizeHandler = (width) => {
    setScreenSize(width);
  };

  const setMediaTypeHandler = (type) => {
    setType(type);
    localStorage.setItem("mediaType", type);
  };

  const fetchMovieGenries = async () => {
    const data = await sendRequest(GENRIES("movie"));
    setMovieGenries(data.genres);
  };

  const fetchTVGenries = async () => {
    const data = await sendRequest(GENRIES("tv"));
    setTvSeriesGenries(data.genres);
  };

  useEffect(() => {
    const mode = localStorage.getItem("mode");

    if (mode) {
      setMode(mode);
      return;
    }
    setMode("dark");
  }, []);

  useEffect(() => {
    const mediaType = localStorage.getItem("mediaType");
    if (!mediaType) return;
    setType(mediaType);
  }, []);

  useEffect(() => {
    fetchMovieGenries();
    fetchTVGenries();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setScreenSize(e.target.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", (e) => {
        setScreenSize(e.target.innerWidth);
      });
    };
  }, []);

  const contextValue = {
    screenSize: screenSize,
    setScreenSize: setScreenSizeHandler,
    totalPages,
    setTotalPages: setTotalPages,
    movieGenries,
    tvSeriesGenries,
    type,
    setMediaTypeHandler,
    mode,
    setMode,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};
