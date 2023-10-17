import { Stack } from "@mui/material";
import React from "react";
import { categories } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const SideBar = ({ selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate();
  const handlerSelectedCategory = (vaule) => {
    navigate(`/`);
    setSelectedCategory(vaule);
  };
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          style={{
            background:
              category.name === selectedCategory && "#FC1503",
            color: "white",
            display: "flex",
            justifyContent: "start",
            gap: "16px",
          }}
          key={category.name}
          onClick={() => handlerSelectedCategory(category.name)}
        >
          <span
            style={{
              color:
                category.name === selectedCategory ? "white" : "red",
            }}
          >
            {category.icon}
          </span>
          <p
            className="inline-block"
            style={{
              whiteSpace: "nowrap", // Ngăn chia dòng
              overflow: "hidden", // Ngăn tràn ra ngoài
              opacity:
                category.name === selectedCategory ? "1" : "0.8",
            }}
          >
            {category.name}
          </p>
        </button>
      ))}
    </Stack>
  );
};

export default SideBar;
