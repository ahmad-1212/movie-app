import WhatshotIcon from "@mui/icons-material/Whatshot";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import TvIcon from "@mui/icons-material/Tv";
import { TfiSearch } from "react-icons/tfi";

export const navlinks = [
  {
    pageTitle: "MOVIE HUB",
    link: "/",
    navitems: [
      { icon: <WhatshotIcon />, title: "TRENDING", link: "trending" },
      { icon: <LocalMoviesIcon />, title: "MOVIES", link: "movies" },
      { icon: <TvIcon />, title: "TV SERIES", link: "tv-shows" },
      { icon: <TfiSearch />, title: "SEARCH", link: "search" },
    ],
  },
];
