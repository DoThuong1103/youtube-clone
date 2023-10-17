import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useLocation, useParams } from "react-router-dom";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;
  const isSearch = currentPath.includes("search");

  useEffect(() => {
    if (isSearch && selectedCategory) {
      setSelectedCategory("");
    }
  }, [isSearch, selectedCategory]);
  const { searchTerm } = useParams();
  useEffect(() => {
    if (searchTerm)
      fetchFromAPI(
        `search?part=snippet&q=${searchTerm !== "" ? searchTerm : ""}`
      ).then((data) => {
        setVideos(data.items);
      });
  }, [searchTerm]);
  useEffect(() => {
    if (selectedCategory)
      fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then(
        (data) => {
          setVideos(data.items);
        }
      );
  }, [selectedCategory]);
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "90vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
          width: { sx: "auto", md: "220px" },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {/* <Typography
            className="copyright"
            variant="body2"
            sx={{ mt: 1.5, color: "#fff" }}
          >
            Copyright Youtube 2023 xxxx
          </Typography> */}
      </Box>
      {isSearch ? (
        <Box
          p={2}
          sx={{ overflowY: "auto", height: "80vh", flex: 2 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "white" }}
          >
            Search Results for:
            <span style={{ color: "#F31503" }}> {searchTerm} </span>
            videos
          </Typography>
          <Videos videos={videos}></Videos>
        </Box>
      ) : (
        <Box
          p={2}
          sx={{ overflowY: "auto", height: "80vh", flex: 2 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "white" }}
          >
            {selectedCategory}
            <span style={{ color: "#F31503" }}> videos</span>
          </Typography>
          <Videos videos={videos}></Videos>
        </Box>
      )}
    </Stack>
  );
};

export default Feed;
