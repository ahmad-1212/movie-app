const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const IMAGE_PLACEHOLDER =
  "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
export const IMAGE_LINK = "https://image.tmdb.org/t/p/w500";

export const TRENDING = (pageNumber = 1, type) =>
  `https://api.themoviedb.org/3/trending/${type}/week?api_key=${API_KEY}&page=${pageNumber}`;

export const GENRIES = (type) =>
  `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`;

export const FILTER_WITH_GENRE = (pageNumber = 1, type, id) =>
  ` https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_genres=${id}&with_watch_monetization_types=flatrate`;

export const DETAIL = (type, id) => `
  https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`;

export const VIDEO = (type, id) =>
  `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`;

export const CASTS = (type, id) =>
  `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`;

export const SEARCH_WITH_QUERY = (type, query) =>
  `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${query}`;
