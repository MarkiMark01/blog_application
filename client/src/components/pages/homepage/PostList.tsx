import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";
import PostItem from "./PostItem";
import { PostListProps } from "../../types/Posts";
import styles from "../../styles/homepage/postlist.module.scss";

const PostList: React.FC<PostListProps> = ({ posts, handleDeletePost }) => {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <ul className={`${styles.postList} ${theme === "dark" ? styles.dark : ""}`}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem key={post.id} post={post} handleDeletePost={handleDeletePost} />
        ))
      ) : (
        <p className={`${styles.noPosts} ${theme === "dark" ? styles.darkText : ""}`}>
          {t("No posts found")}
        </p>
      )}
    </ul>
  );
};

export default PostList;




