import React, { useContext } from "react";
import { MovieContext } from "../context/movieContext";
import { TRENDING, FILTER_WITH_GENRE } from "../constants";
import Display from "../components/Display";

const Movies = () => {
  const { movieGenries } = useContext(MovieContext);

  return (
    <Display
      genres={movieGenries}
      url={TRENDING}
      genreURL={FILTER_WITH_GENRE}
      type="movie"
    />
  );
};

export default Movies;
