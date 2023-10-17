import React, { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const CommentCard = ({ comment }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [valueReply, setValueReply] = useState("");

  const handleEmojiSelect = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => {
      codeArray.push("0x" + el);
      let emoji = String.fromCodePoint(...codeArray);
      setValueReply(valueReply + emoji);
    });
  };
  const handlerCannelReply = () => {
    setShowReply(false);
    setValueReply("");
    setShowEmoji(false);
  };
  console.log(comment);
  return (
    <div className="flex gap-4 pt-4 w-4/5">
      <div className="w-10 h-10 rounded-full">
        <Link
          to={`/channel/${comment?.snippet?.topLevelComment?.snippet?.authorChannelId?.value}`}
        >
          <img
            className="rounded-full"
            src={
              comment?.snippet?.topLevelComment?.snippet
                ?.authorProfileImageUrl
            }
            alt=""
          />
        </Link>
      </div>
      <div className="flex flex-col gap-2 flex-1 ">
        <div className="flex gap-2 items-center">
          <Link
            to={`/channel/${comment?.snippet?.topLevelComment?.snippet?.authorChannelId?.value}`}
          >
            <span className="font-bold text-lg text-white">
              {
                comment?.snippet?.topLevelComment?.snippet
                  ?.authorDisplayName
              }{" "}
            </span>
          </Link>
          <span>
            {comment?.snippet?.topLevelComment?.snippet?.publishedAt}{" "}
          </span>
        </div>
        <div>
          <span>
            {comment?.snippet?.topLevelComment?.snippet?.textOriginal}{" "}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1 text-xs">
            <span className="cursor-pointer hover:bg-slate-700 rounded-full p-1">
              <ThumbUpAltIcon />
            </span>
            <span>
              {comment?.snippet?.topLevelComment?.snippet
                ?.likeCount !== 0
                ? comment?.snippet?.topLevelComment?.snippet
                    ?.likeCount
                : ""}
            </span>
          </div>
          <div>
            <span className="cursor-pointer hover:bg-slate-700 rounded-full p-1">
              <ThumbDownAltIcon />
            </span>
          </div>
          <div className="cursor-pointer hover:bg-slate-800 rounded-[18px] px-3 py-1">
            <span onClick={handlerCannelReply}>
              reply
              {/* {
                comment?.snippet?.topLevelComment?.snippet
                  ?.totalReplyCount
              } */}
            </span>
          </div>
        </div>
        {showReply && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="bg-transparent outline-none border-b-[1px]  py-[2px]"
              placeholder="Feedback..."
              value={valueReply}
              onChange={(e) => setValueReply(e.target.value)}
            />
            <div className="flex items-center justify-between cursor-pointer">
              <SentimentVerySatisfiedRoundedIcon
                onClick={() => setShowEmoji(!showEmoji)}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handlerCannelReply}
                  className="py-1 px-4 rounded-[18px] hover:bg-slate-800 transition-all"
                >
                  Cannel
                </button>
                <button
                  disabled={!valueReply}
                  className={`py-1 px-4 rounded-[18px]  ${
                    valueReply
                      ? "bg-blue-500 text-white hover:bg-blue-600 transition-all"
                      : " text-gray-500"
                  }`}
                >
                  Reply
                </button>
              </div>
            </div>
            <div className="reactions">
              {showEmoji && (
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
