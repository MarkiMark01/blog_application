import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PostItem from "./PostItem";
import { PostListProps } from "../../types/Posts";
import { BeatLoader } from "react-spinners";
import styles from "../../styles/homepage/postlist.module.scss";

const PostList: React.FC<PostListProps> = ({ posts, handleDeletePost }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [serverReady, setServerReady] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    const timeout = setTimeout(() => {
      setServerReady(true);
    }, 90000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ul className={`${styles.postList} ${theme === "dark" ? styles.dark : ""}`}>
      {posts.length > 0
        ? posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              handleDeletePost={handleDeletePost}
            />
          ))
        : !serverReady && (
            <div
              className={`${styles.noPosts} ${
                theme === "dark" ? styles.darkText : ""
              }`}
            >
              <BeatLoader/>
              <span
                className={styles.timeLeft}
              >{`Time left: ${timeElapsed}s`}</span>
              <span className={styles.serverMessage}>
                The server is hosted on render.com, which may take more than 50
                seconds to start. Thank you for your patience!
              </span>
            </div>
          )}
    </ul>
  );
};

export default PostList;
