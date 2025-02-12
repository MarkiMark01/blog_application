import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { PostFormProps } from "../../types/Posts";
import styles from "../../styles/homepage/postform.module.scss";

const PostForm: React.FC<PostFormProps> = ({ handleCreatePost }) => {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPost.title || !newPost.content) {
      toast.error(t("Fill in all fields!"));
      return;
    }

    handleCreatePost(newPost.title, newPost.content);
    toast.success(t("Post successfully created!"));
    setNewPost({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.postForm} ${theme === "dark" ? styles.dark : ""}`}>
      <input
        type="text"
        placeholder={t("Title")}
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <textarea
        placeholder={t("Post content")}
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
      />
      <button type="submit">{t("Create")}</button>
    </form>
  );
};

export default PostForm;



