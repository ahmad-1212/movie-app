import { ThumbUp } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_LINK, IMAGE_PLACEHOLDER } from "../constants";
import { motion } from "framer-motion";
import { tokens } from "../theme";
import { MovieContext } from "../context/movieContext";

const cardVariant = {
  hidden: { scale: 0.7, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const MovieCard = ({
  id,
  title,
  poster,
  backdrop,
  popularity,
  releaseDate,
  mediaType,
}) => {
  const navigate = useNavigate();
  const imagePath = backdrop || poster;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setMediaTypeHandler } = useContext(MovieContext);

  const handleLink = (link) => {
    setMediaTypeHandler(mediaType);
    navigate(`/moviehub/detail/${link}`);
  };

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.01 }}
    >
      <Card
        sx={{
          minWidth: "100%",
          height: "100%",
          backgroundColor: colors.primary[900],
        }}
        onClick={() => handleLink(id)}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="350px"
            width="100%"
            image={!imagePath ? IMAGE_PLACEHOLDER : `${IMAGE_LINK}${imagePath}`}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title.length > 18 ? `${title.slice(0, 18)}...` : title}
            </Typography>

            <Typography
              mt="10px"
              paragraph
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box component="span">Release Date: {releaseDate}</Box>
              <Box
                component="span"
                display="flex"
                alignItems="center"
                gap="6px"
              >
                {Math.ceil(popularity)} <ThumbUp fontSize="inherit" />
              </Box>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};

export default MovieCard;
