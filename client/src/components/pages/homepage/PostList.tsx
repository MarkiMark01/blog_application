import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PostItem from "./PostItem";
import { PostListProps } from "../../types/Posts";
import styles from "../../styles/homepage/postlist.module.scss";
import { BeatLoader } from "react-spinners";

const PostList: React.FC<PostListProps> = ({ posts, handleDeletePost }) => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  
  const [timeLeft, setTimeLeft] = useState(50);

  useEffect(() => {
    if (posts.length === 0 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); 

      return () => clearInterval(timer);
    }
  }, [posts, timeLeft]);

  return (
    <ul className={`${styles.postList} ${theme === "dark" ? styles.dark : ""}`}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem key={post.id} post={post} handleDeletePost={handleDeletePost} />
        ))
      ) : (
        <p className={`${styles.noPosts} ${theme === "dark" ? styles.darkText : ""}`}>
          <BeatLoader />
          {timeLeft > 0 ? (
            <span className={styles.timeLeft}>{`Time left: ${timeLeft}s`}</span>
          ) : (
            <span className={styles.serverReady}>Server is ready!</span>
          )}
        </p>
      )}
    </ul>
  );
};

export default PostList;






