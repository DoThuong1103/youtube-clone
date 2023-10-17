import { Box, Stack } from "@mui/material";
import React from "react";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";

const Videos = ({ videos, gap, widthVideoCard }) => {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      sx={{
        justifyContent: {
          xs: "center",
          sm: "start",
        },
      }}
      gap={gap || 2}
    >
      {videos.map(
        (item, id) =>
          !item.id.playlistId && (
            <Box key={id}>
              {item.id.videoId && (
                <VideoCard
                  video={item}
                  widthVideoCard={widthVideoCard}
                />
              )}
              {item.id.channelId && (
                <ChannelCard channelDetail={item} />
              )}
            </Box>
          )
      )}
    </Stack>
  );
};

export default Videos;
