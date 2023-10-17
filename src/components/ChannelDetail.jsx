import React, { useEffect, useState } from "react";
import { Videos, ChannelCard } from "./";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Box } from "@mui/material";
const ChannelDetail = () => {
  const [ChannelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetail(data?.items[0]);
    });
    fetchFromAPI(
      `search?channelId=${id}&part=snippet&order=date`
    ).then((data) => {
      setVideos(data?.items);
    });
  }, [id]);
  console.log(videos);
  return (
    <Box minHeight="96vh">
      <Box>
        {ChannelDetail?.brandingSettings?.image?.bannerExternalUrl ? (
          <img
            alt=""
            srcset={` ${ChannelDetail?.brandingSettings?.image?.bannerExternalUrl}`}
            width="100%"
            height="300px"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              height: "300px",
            }}
          />
        ) : (
          <div className="bg-black w-full h-32"></div>
        )}
        <ChannelCard
          channelDetail={ChannelDetail}
          marginTop="-92px"
        />
        {videos.length < 1 && (
          <span className="text-3xl font-bold text-white flex justify-center">No videos</span>
        )}
        <div
          style={{
            marginLeft: "120px",
          }}
        >
          <Videos videos={videos} gap={4}></Videos>
        </div>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
