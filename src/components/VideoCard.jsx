import { CheckCircle } from "@mui/icons-material";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import React from "react";

import {
  demoChannelUrl,
  demoVideoUrl,
  demoChannelTitle,
  demoVideoTitle,
} from "../utils/constants";
import { Link } from "react-router-dom";

const VideoCard = ({ video, widthVideoCard }) => {
  return (
    <Card
      sx={{
        width: {
          xs: "320px",
          sm: "340px",
          md: widthVideoCard || "300px",
        },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link
        to={video?.id?.videoId ? `/video/${video?.id?.videoId}` : ""}
      >
        <CardMedia
          image={video?.snippet?.thumbnails?.high?.url}
          alt={video?.snippet?.title}
          sx={{
            width: {
              xs: "320px",
              sm: "340px",
              md: "300px",
            },
            height: 180,
          }}
        />
      </Link>
      <CardContent
        sx={{ backgroundColor: "#1e1e1e", height: "106px" }}
      >
        <Link
          to={
            video?.videoId ? `/video/${video?.videoId}` : demoVideoUrl
          }
        >
          <Typography
            variant="subtitle1"
            color="#fff"
            fontWeight="bold"
          >
            {video?.snippet?.title?.length > 60
              ? video?.snippet?.title.slice(0, 40) + "..."
              : video?.snippet?.title || demoVideoTitle}
          </Typography>
        </Link>
        <Link
          to={
            video?.snippet?.channelId
              ? `/channel/${video?.snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography
            variant="subtitle2"
            color="gray"
            fontWeight="bold"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {video?.snippet?.channelTitle || demoChannelTitle}
            <CheckCircle
              sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
            />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
