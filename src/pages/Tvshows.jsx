import React, { useContext } from "react";
import { MovieContext } from "../context/movieContext";
import { TRENDING, FILTER_WITH_GENRE } from "../constants";
import Display from "../components/Display";

const Movies = () => {
  const { tvSeriesGenries } = useContext(MovieContext);

  return (
    <Display
      genres={tvSeriesGenries}
      url={TRENDING}
      genreURL={FILTER_WITH_GENRE}
      type="tv"
    />
  );
};

export default Movies;
