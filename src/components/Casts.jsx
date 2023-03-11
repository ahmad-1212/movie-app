import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CASTS, IMAGE_LINK } from "../constants";
import useHttp from "../hooks/useHttp";
import { motion } from "framer-motion";
import Message from "./UI/Message";
const Casts = ({ type, id }) => {
  const [sendRequest, loading] = useHttp();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const fetchCasts = async () => {
      const data = await sendRequest(CASTS(type, id));
      setCasts(data.cast);
    };
    fetchCasts();
  }, [type, id, sendRequest]);

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 1,
          duration: 0.4,
        },
      }}
    >
      <Typography variant="h2" fontWeight="bold" textAlign="center" mb="50px">
        Casts
      </Typography>
      {!loading && casts.length === 0 && (
        <Typography variant="h3" textAlign="center">
          No Casts Found!
        </Typography>
      )}
      <Message loading={loading} size={25} />
      {!loading && (
        <Box component="div" className="casts">
          {casts?.map((cast, i) => (
            <Box
              key={cast.id + i}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={`${IMAGE_LINK}${cast.profile_path}`}
                width="80px"
                height="80px"
                style={{ borderRadius: "50%", objectFit: "cover" }}
                alt=""
              />
              <Typography
                variant="h5"
                mt="5px"
                fontWeight="bold"
                textAlign="center"
              >
                {cast.original_name || cast.name}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </motion.section>
  );
};

export default Casts;
