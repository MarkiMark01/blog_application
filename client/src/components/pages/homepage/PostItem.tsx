import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PostItemProps } from "../../types/Posts";
import styles from "../../styles/homepage/postitem.module.scss";

const PostItem: React.FC<PostItemProps> = ({ post, handleDeletePost }) => {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <li className={`${styles.postItem} ${theme === "dark" ? styles.dark : ""}`}>
      <Link
        to={`/posts/${post.id}`}
        className={`${styles.postTitle} ${
          theme === "dark" ? styles.darkText : ""
        }`}
      >
        {post.title}
      </Link>
      <button
        className={styles.deleteButton}
        onClick={() => handleDeletePost(post.id)}
      >
        {t("Delete")}
      </button>
    </li>
  );
};

export default PostItem;

