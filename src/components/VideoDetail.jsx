import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import ReactPlayer from "react-player";
import ShowMoreText from "react-show-more-text";
import formatNumber from "../utils/utils";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import ShareDialog from "./ShareDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Videos from "./Videos";
import Comments from "./Comments";
const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [channelDetail, setChannelDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then(
      (data) => {
        setVideo(data.items[0]);
      }
    );
    fetchFromAPI(
      `search?part=snippet&relatedToVideoId=${id}&type=video`
    ).then((data) => {
      setRelatedVideos(data.items);
    });
  }, [id]);
  useEffect(() => {
    if (video)
      fetchFromAPI(
        `channels?part=snippet&id=${video?.snippet?.channelId}`
      ).then((data) => {
        setChannelDetail(data?.items[0]);
      });
  }, [video]);
  useEffect(() => {
    if (channelDetail)
      fetchFromAPI(
        `commentThreads?part=snippet&videoId=${id}&maxResults=250`
      ).then((data) => {
        setComments(data);
      });
  }, [channelDetail, id]);
  function detectLinks(text) {
    if (!text) return null;
    const linkRegex = /https?:\/\/\S+/g;
    const parts = text.split(linkRegex);
    const links = text.match(linkRegex);

    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {index > 0 && links && links[index - 1] ? (
          <a
            href={links[index - 1]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3ea6ff] underline"
          >
            {links[index - 1]}
          </a>
        ) : null}
        {part}
      </React.Fragment>
    ));
  }
  const notify = (type, message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  console.log(channelDetail);
  return (
    <>
      <Box minHeight="95vh" className="text-white py-4 ">
        <Stack direction={{ xs: "column" }}>
          <ReactPlayer
            // controls={true}
            // playing={true}
            url={`https://youtube.com/watch?v=${id}`}
            className="react-player"
            controls
            // volume={0}
            // config={{
            //   youtube: {
            //     playerVars: { controls: 1, showinfo: 1 },
            //   },
            // }}
          />
          <Box className="flex flex-col md:flex-row justify-between gap-4">
            <Box className="mx-4 flex-1">
              <Box>
                <Typography
                  color="#fff"
                  variant="h5"
                  fontWeight="bold"
                  className="pt-8"
                >
                  {video?.snippet?.title}
                </Typography>
                {video && (
                  <div className="flex flex-col justify-start items-start md:flex-row  md:justify-between md:items-center">
                    <Link to={`/channel/${channelDetail?.id}`}>
                      <Box className="flex gap-4 py-2 ">
                        <div>
                          <img
                            src={
                              channelDetail?.snippet?.thumbnails?.high
                                ?.url
                            }
                            alt="logo channel"
                            className="w-16 rounded-full "
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <Typography
                            color="#fff"
                            variant="h6"
                            fontWeight="bold"
                          >
                            {channelDetail?.snippet?.localized?.title}
                          </Typography>
                          <Typography color="#fff">
                            {formatNumber(
                              channelDetail?.statistics
                                ?.subscriberCount
                            )}{" "}
                            subscribers
                          </Typography>
                        </div>
                      </Box>
                    </Link>
                    <Box className="flex flex-row gap-4 text-white">
                      <div className="flex items-center rounded-[18px] bg-slate-800">
                        <Box
                          className="cursor-pointer bg-slate-800 hover:bg-slate-600 py-1 pl-4 pr-2 rounded-l-[18px]"
                          title="I like this video"
                          onClick={() =>
                            notify(
                              "warning",
                              "This feature is in the process of being developed, please try again later."
                            )
                          }
                        >
                          <ThumbUpAltIcon className="w-6 h-6" />{" "}
                          {`${formatNumber(
                            video?.statistics?.likeCount
                          )}`}
                        </Box>
                        <div className="h-4 w-[1px] bg-white"></div>
                        <Box
                          className="cursor-pointer bg-slate-800 hover:bg-slate-600 py-1 pl-2 pr-4 rounded-r-[18px]"
                          title="I don't like this video"
                          onClick={() =>
                            notify(
                              "warning",
                              "This feature is in the process of being developed, please try again later."
                            )
                          }
                        >
                          <ThumbDownAltIcon className="w-6 h-6" />
                        </Box>
                      </div>
                      <div
                        title="Share"
                        className="flex  gap-2 items-center rounded-[18px] bg-slate-800 hover:bg-slate-600 px-4 cursor-pointer"
                        onClick={handleClickOpen}
                      >
                        <ReplyIcon className="transform scale-x-[-1] w-6 h-6" />{" "}
                        Share
                      </div>
                    </Box>
                  </div>
                )}
              </Box>
              <Box className="flex gap-4 pt-4 justify-end">
                <div className="flex flex-col gap-4 flex-1 ">
                  <div className="bg-slate-800 p-2 rounded-md ">
                    <div className="flex gap-4 ">
                      <Typography
                        color="#fff"
                        variant="subtitle2"
                        fontWeight="bold"
                      >
                        {`${formatNumber(
                          video?.statistics?.viewCount
                        )} views`}
                      </Typography>
                      <Typography
                        color="#fff"
                        variant="subtitle2"
                        fontWeight="bold"
                      >
                        {video?.snippet?.publishedAt}
                      </Typography>
                    </div>
                    <ShowMoreText
                      /* Default options */
                      lines={2}
                      more="Show more"
                      less="Show less"
                      className="content-css"
                      anchorClass="show-more-less-clickable"
                      expanded={false}
                      width={280}
                      truncatedEndingComponent={"... "}
                    >
                      <pre className="font-sans">
                        {detectLinks(video?.snippet?.description)}
                      </pre>
                    </ShowMoreText>
                  </div>
                  <Comments
                    comments={comments}
                    className="pt-8"
                  ></Comments>
                </div>
              </Box>
            </Box>
            <div className="w-[300px] mx-auto">
              <Videos videos={relatedVideos}></Videos>
            </div>
          </Box>
        </Stack>
        <ShareDialog
          open={open}
          onClose={handleClose}
          id={id}
          notify={() => notify("success", "Copied to clipboard!")}
        />
      </Box>
      <ToastContainer />
    </>
  );
};

export default VideoDetail;
