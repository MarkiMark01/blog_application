import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PostContentProps } from "../../types/Posts";
import { useTranslation } from "react-i18next";
import styles from "../../styles/postpage/postcontent.module.scss";

const PostContent: React.FC<PostContentProps> = ({
  title,
  content,
  onDelete,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <section
      className={`${styles.postContent} ${theme === "dark" ? styles.dark : ""}`}
    >
      <button className={styles.btn} onClick={() => navigate("/")}>
        {t("Back")}
      </button>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{content}</p>
      <button className={styles.button} onClick={onDelete}>
        {t("Delete post")}
      </button>
    </section>
  );
};

export default PostContent;

