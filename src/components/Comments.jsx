import React, { useEffect, useRef, useState } from "react";
import CommentCard from "./CommentCard";

const Comments = ({ comments, isNextPage }) => {
  const [visibleComments, setVisibleComments] = useState(10);
  const [heightComment, setHeightComment] = useState(0);
  const [scrollLength, setScrollLength] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const showMoreComments = () => {
    if (comments?.items?.length >= visibleComments) {
      setShowLoading(true);
      setTimeout(() => {
        setVisibleComments(
          (prevVisibleComments) => prevVisibleComments + 10
        );
        setShowLoading(false);
      }, 2000);
    }
  };
  const divRef = useRef(null);
  useEffect(() => {
    if (divRef.current && comments) {
      const divHeight = divRef.current.clientHeight;
      setHeightComment(divHeight);
    }
  }, [visibleComments, comments]);

  useEffect(() => {
    if (
      heightComment > 0 &&
      scrollLength - 100 > heightComment &&
      !showLoading
    ) {
      showMoreComments();
    }
  }, [scrollLength, heightComment]);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollLength = window.scrollY;
      setScrollLength(currentScrollLength);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="hidden md:block" ref={divRef}>
        {comments?.items
          ?.slice(0, visibleComments)
          ?.map((comment, index) => (
            <CommentCard comment={comment} key={index} />
          ))}
      </div>
      <div className="md:hidden">
        {comments?.items
          ?.slice(0, visibleComments)
          ?.map((comment, index) => (
            <CommentCard comment={comment} key={index} />
          ))}
      </div>
      {showLoading && <div>Loading...</div>}
      {visibleComments < comments?.items?.length && (
        <button onClick={showMoreComments} className="md:hidden">
          Hiển thị thêm
        </button>
      )}
    </>
  );
};

export default Comments;
