import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { PostFormProps } from "../../types/Posts";
import EmojiPicker from "emoji-picker-react";
import styles from "../../styles/homepage/postform.module.scss";

const PostForm: React.FC<PostFormProps> = ({ handleCreatePost }) => {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null); 
  const emojiButtonRef = useRef<HTMLSpanElement>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPost.title || !newPost.content) {
      toast.error(t("Fill in all fields!"));
      return;
    }

    handleCreatePost(newPost.title, newPost.content);
    setNewPost({ title: "", content: "" });
  };

  const handleEmojiSelect = (emoji: { emoji: string }) => {
    setNewPost((prev) => ({ ...prev, content: prev.content + emoji.emoji }));
    setShowEmojiPicker(false); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.postForm} ${theme === "dark" ? styles.dark : ""}`}
    >
      <input
        type="text"
        placeholder={t("Title")}
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <div style={{ position: "relative" }}>
        <textarea
          placeholder={t("Post content")}
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
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
      <button type="submit">{t("Create")}</button>
    </form>
  );
};

export default PostForm;








