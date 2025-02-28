import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";
import { CommentFormProps } from "../../types/Posts";
import EmojiPicker from "emoji-picker-react";
import styles from "../../styles/postpage/commentform.module.scss";

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null); // Ref for EmojiPicker
  const emojiButtonRef = useRef<HTMLSpanElement>(null); // Ref for emoji button

  // Close the EmojiPicker if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false); // Close the emoji picker
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText("");
    }
  };

  const handleEmojiSelect = (emoji: { emoji: string }) => {
    setCommentText((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false); // Close emoji picker after selecting an emoji
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
      <div style={{ position: "relative" }}>
        <span
          ref={emojiButtonRef}
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className={styles.emojiButton}
        >
          😄
        </span>
      </div>
      {showEmojiPicker && (
        <div ref={emojiPickerRef} className={styles.emojiPickerWrapper}>
          <EmojiPicker onEmojiClick={handleEmojiSelect} width="250px" />
        </div>
      )}
      <button type="submit">{t("Add comment")}</button>
    </form>
  );
};

export default CommentForm;



