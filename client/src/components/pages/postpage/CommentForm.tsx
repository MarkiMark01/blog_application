import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";
import { CommentFormProps } from "../../types/Posts";
import styles from "../../styles/postpage/commentform.module.scss";

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const { t } = useTranslation();
  const [commentText, setCommentText] = useState("");
  const theme = useSelector((state: RootState) => state.theme.mode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.commentForm} ${theme === "dark" ? styles.dark : ""}`}
    >
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder={t("Write a comment...")}
      />
      <button type="submit">{t("Add comment")}</button>
    </form>
  );
};

export default CommentForm;


