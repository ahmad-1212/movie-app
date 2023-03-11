import { Button, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/movieContext";
import { tokens } from "../theme";
import { motion } from "framer-motion";
import useHttp from "../hooks/useHttp";
import MovieCard from "../components/MovieCard";
import MoviesPagination from "../components/MoviesPagination";
import Message from "./UI/Message";

// Framer Animations
const sectionVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const buttonVariant = {
  hidden: { y: -10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Display = ({ genres, url, genreURL, type }) => {
  const [sendRequest, loading, error] = useHttp();
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(1);
  const [data, setData] = useState([]);
  const [genre, setGenre] = useState();
  const [genreID, setGenreID] = useState();
  const { setTotalPages } = useContext(MovieContext);
  const URL =
    !genre && !genreID
      ? url(currentPage, type)
      : genreURL(currentPage, type, genreID);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const setGenreHandler = (value, id) => {
    setGenre(value);
    setGenreID(id);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await sendRequest(URL);
      setData(data.results);
      setTotalPages(data.total_pages);
      setDefaultPage(data.page);
    };
    fetchMovies();
  }, [currentPage, sendRequest, genreID, URL, setTotalPages]);

  return (
    <>
      {genres && genres.length > 0 && !error && (
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          animate="visible"
          className="genre-section"
          style={{
            borderBottom: `solid 0.5px ${colors.primary[800]}`,
          }}
        >
          {genres?.map((item, i) => (
            <motion.div variants={buttonVariant} key={item.id + i}>
              <Button
                variant="text"
                size="large"
                sx={{
                  width: "max-content",
                  maxWidth: "100%",
                  fontWeight: "bold",
                  fontSize: "15px",
                  backgroundColor:
                    genre === item.name
                      ? colors.green[300]
                      : colors.primary[800],
                  color: genre === item.name ? "#fff" : "",
                  "&:hover": {
                    backgroundColor: colors.green[300],
                    color: "#fff",
                  },
                }}
                onClick={(e) => setGenreHandler(e.target.textContent, item.id)}
              >
                {item.name}
              </Button>
            </motion.div>
          ))}
        </motion.section>
      )}

      <section className="card-section" style={{ marginTop: "30px" }}>
        {!loading &&
          !error &&
          data?.map((item) => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.original_title || item.original_name}
              poster={item.poster_path}
              backdrop={item.backdrop_path}
              popularity={item.popularity}
              releaseDate={item.release_date}
              mediaType={type && type !== "all" ? type : item.media_type}
            />
          ))}
      </section>

      {!loading && !error && (
        <MoviesPagination
          defaultPage={defaultPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      <Message loading={loading} error={error} size={70} />
    </>
  );
};

export default Display;
