import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/movieContext";
import { DETAIL, IMAGE_LINK, IMAGE_PLACEHOLDER, VIDEO } from "../constants";
import useHttp from "../hooks/useHttp";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { tokens } from "../theme";
import { TbMovie } from "react-icons/tb";
import ReactPlayer from "react-player/youtube";
import Modal from "../components/UI/Modal";
import Casts from "../components/Casts";
import Loading from "../components/UI/Loading";
import Message from "../components/UI/Message";
const sectionVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
};

const itemVariant = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const imageVariant = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const Detail = () => {
  const [detailData, setDetailData] = useState();
  const [movieID, setMovieID] = useState();
  const [videoID, setVideoID] = useState();
  const [isVideo, setIsVideo] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [sendRequest, loading, error] = useHttp();
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState();
  const { type, screenSize } = useContext(MovieContext);
  const params = useParams();
  const { id: typeID } = params;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let imagePath;
  if (detailData) {
    const { backdrop_path: backdrop, poster_path: poster } = detailData;
    imagePath = backdrop || poster;
  }

  const fetchData = useCallback(async () => {
    if (!type) return;
    const data = await sendRequest(DETAIL(type, typeID));
    setDetailData(data);
    setMovieID(data.id);
  }, [type, typeID, sendRequest]);

  const fetchVideo = useCallback(async () => {
    try {
      setIsVideoLoading(true);
      if (!movieID) return;
      setOpenModal(true);
      const response = await fetch(VIDEO(type, movieID));
      if (!response.ok)
        throw new Error(`Something went wrong ${response.message}`);
      const data = await response.json();
      setIsVideoLoading(false);
      if (data.results.length === 0) {
        setIsVideo(false);
        return;
      }
      setVideoID(data.results[0].key);
    } catch (err) {
      setVideoError(err.message);
      setIsVideoLoading(false);
    }
  }, [type, movieID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Message loading={loading} error={error} size={70} />
      {!loading && !error && (
        <Box width="100%" mb="60px">
          {!loading && detailData && (
            <motion.div
              className="info-section"
              variants={sectionVariant}
              initial="hidden"
              animate="visible"
            >
              <motion.img
                variants={imageVariant}
                src={
                  !imagePath ? IMAGE_PLACEHOLDER : `${IMAGE_LINK}${imagePath}`
                }
                width={screenSize > 900 ? "400px" : "100%"}
                height="500px"
                style={{ objectFit: "cover", borderRadius: "5px" }}
              />
              <motion.div
                variants={itemVariant}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Typography
                  variant={screenSize > 600 ? "h2" : "h4"}
                  sx={{ mt: { md: "20px", sm: "0" } }}
                  fontWeight="bold"
                >
                  {detailData.original_title ||
                    detailData.original_name ||
                    detailData.name}
                </Typography>
                <Typography
                  paragraph
                  fontSize="18px"
                  color={colors.primary[400]}
                >
                  {detailData.overview}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.primary[400]}
                >
                  Release Date:{" "}
                  {detailData.first_air_date || detailData.release_date}
                </Typography>
                <motion.div
                  style={{ alignSelf: "start" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                >
                  {" "}
                  <Button
                    onClick={fetchVideo}
                    size="large"
                    variant="contained"
                    color="secondary"
                    sx={{ fontSize: "18px" }}
                    startIcon={<TbMovie />}
                  >
                    Play Trailler
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          <Modal
            open={openModal}
            handleClose={() => setOpenModal(false)}
            width={screenSize > 600 ? "600px" : "100%"}
            height="400px"
            backgroundColor="#000"
          >
            {isVideo && videoID && !videoError && !isVideoLoading && (
              <ReactPlayer
                width="100%"
                height="98%"
                url={`https://www.youtube.com/watch?v=${videoID}`}
              />
            )}
            {!isVideo && !loading && (
              <Typography
                variant="h4"
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                No video Available!
              </Typography>
            )}
            <Message loading={loading} error={videoError} />
            {isVideoLoading && (
              <Box mt="180px">
                <Loading size={35} />
              </Box>
            )}
          </Modal>
        </Box>
      )}
      {movieID && !loading && <Casts type={type} id={movieID} />}
    </>
  );
};

export default Detail;
