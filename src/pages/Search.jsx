import React, { useState } from "react";

import { Box, useTheme, Button, Typography } from "@mui/material";
import { tokens } from "../theme";
import { motion } from "framer-motion";
import useHttp from "../hooks/useHttp";
import { SEARCH_WITH_QUERY } from "../constants";
import MovieCard from "../components/MovieCard";
import Message from "../components/UI/Message";

const Search = () => {
  const [type, setType] = useState("movie");
  const [query, setQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState();
  const [isData, setIsData] = useState(true);
  const [sendRequest, loading, error] = useHttp();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const changeTypeHandler = (value) => {
    value === "Movie" ? setType("movie") : setType("tv");
  };

  const changeInputHandler = (value) => {
    setQuery(value);
  };

  const fetchQueryData = async () => {
    setSearchText(query);
    if (!query || query.length < 1) return;
    const queryText = query.replaceAll(" ", "+");
    const data = await sendRequest(SEARCH_WITH_QUERY(type, queryText));
    setData(data.results);
    if (data.results.length > 0) setIsData(true);
    if (data.results.length === 0) setIsData(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setQuery("");
    fetchQueryData();
  };

  return (
    <>
      <section>
        <Box
          component="form"
          display="flex"
          alignItems="center"
          gap="10px"
          flexWrap="wrap"
          sx={{ display: { xs: "block", sm: "flex" } }}
          onSubmit={(e) => submitHandler(e)}
        >
          <input
            required
            className="input"
            type="text"
            value={query}
            placeholder="Search here..."
            onChange={(e) => changeInputHandler(e.target.value)}
            style={{
              color: colors.primary[200],
              border: `2px solid ${colors.primary[200]}`,
            }}
          />

          <select
            onChange={(e) => changeTypeHandler(e.target.value)}
            className="input"
            style={{
              color: colors.primary[200],
              border: `2px solid ${colors.primary[200]}`,
            }}
          >
            <option>Movie</option>
            <option>TV Series</option>
          </select>

          <motion.div style={{ alignSelf: "start" }}>
            {" "}
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="secondary"
              sx={{ fontSize: "16px", padding: "7px 30px", display: "block" }}
            >
              Search
            </Button>
          </motion.div>
        </Box>
      </section>

      <Message loading={loading} error={error} size={70} />

      {!loading && data && (
        <Typography variant="h4" mt="30px">
          Search Results for "{searchText}"
        </Typography>
      )}

      {data && !error && (
        <section className="card-section" style={{ marginTop: "50px" }}>
          {!loading &&
            data &&
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
      )}
      {!loading && !isData && (
        <Box display="block" textAlign="center" mt="90px">
          Sorry! No results Found. Try with something else...
        </Box>
      )}
    </>
  );
};

export default Search;
