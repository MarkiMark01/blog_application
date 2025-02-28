import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PostItem from "./PostItem";
import { PostListProps } from "../../types/Posts";
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
    }, 50000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ul className={`${styles.postList} ${theme === "dark" ? styles.dark : ""}`}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem key={post.id} post={post} handleDeletePost={handleDeletePost} />
        ))
      ) : (
        !serverReady && (
          <div className={`${styles.noPosts} ${theme === "dark" ? styles.darkText : ""}`}>
            <BeatLoader color="#ff6347" />
            <span className={styles.timeLeft}>{`Time left: ${timeElapsed}s`}</span>
            <span className={styles.serverMessage}>
              Please note: The server is hosted on render.com, so it may take a little longer than expected. 
              Thank you for your patience!
            </span>
          </div>
        )
      )}
    </ul>
  );
};

export default PostList;







