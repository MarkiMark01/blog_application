import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";
import styles from "../../styles/postpage/commentlist.module.scss";

interface CommentListProps {
  comments: { id: number; content: string }[];
  onDelete: (commentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onDelete }) => {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <section className={`${styles.commentList} ${theme === "dark" ? styles.dark : ""}`}>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.commentItem}>
              <span className={styles.commentText}>{comment.content}</span>
              <button className={styles.commentButton} onClick={() => onDelete(comment.id)}>
                {t("Delete")}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={`${styles.noComments} ${theme === "dark" ? styles.dark : ""}`}>
          {t("No comments yet")}
        </p>
      )}
    </section>
  );
};

export default CommentList;


  