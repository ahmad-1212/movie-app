import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Loading from "../components/UI/Loading";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loading size={70} marginTop="200px" />}>
      <Component {...props} />
    </Suspense>
  );

const Trending = Loadable(lazy(() => import("./Trending")));
const Movies = Loadable(lazy(() => import("./Movies")));
const Tvshows = Loadable(lazy(() => import("./Tvshows")));
const Detail = Loadable(lazy(() => import("./Detail")));
const Search = Loadable(lazy(() => import("./Search")));
const NotFound = Loadable(lazy(() => import("./NotFound")));

export const routes = [
  { path: "/", element: <Navigate to="/moviehub/trending" /> },

  {
    path: "moviehub",
    element: <Layout />,
    children: [
      {
        path: "trending",
        element: <Trending />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "tv-shows",
        element: <Tvshows />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },

  { path: "*", element: <NotFound /> },
];
