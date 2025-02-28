import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { RootState, AppDispatch } from "../../redux/store";
import {
  fetchPosts,
  deletePost,
  createComment,
  deleteComment,
} from "../../redux/postsOperations";
import { toast } from "react-hot-toast";
import PostContent from "./PostContent";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import Pagination from "../homepage/Pagination";
import styles from "../../styles/postpage/postpage.module.scss";

const COMMENTS_PER_PAGE = 5;

const PostPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { posts } = useSelector((state: RootState) => state.posts);
  const [localComments, setLocalComments] = useState<{ id: number; content: string }[]>(
    []
  );
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [currentPage, setCurrentPage] = useState(1);

  const post = posts.find((p) => p.id === Number(id));

  useEffect(() => {
    if (!post) {
      dispatch(fetchPosts());
    } else {
      setLocalComments(post.comments || []);
    }
  }, [dispatch, posts]);

  const handleDeletePost = async () => {
    if (!id) return;
    try {
      await dispatch(deletePost(Number(id))).unwrap();
      toast.success(t("Post successfully deleted"));
      navigate("/");
    } catch {
      toast.error(t("Error deleting post"));
    }
  };

  const handleAddComment = async (content: string) => {
    if (!id) return;
    try {
      // Відправка запиту для створення коментаря з додаванням заголовка Content-Type
      await dispatch(createComment({ postId: Number(id), content })).unwrap();
      await dispatch(fetchPosts());
      toast.success(t("Comment added"));
      setCurrentPage(1);
    } catch {
      toast.error(t("Error adding comment"));
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!id) return;
    try {
      await dispatch(deleteComment({ postId: Number(id), commentId })).unwrap();
      setLocalComments((prev) =>
        prev.filter((comment) => comment.id !== commentId)
      );
      toast.success(t("Comment deleted"));
    } catch {
      toast.error(t("Error deleting comment"));
    }
  };

  const totalPages = Math.ceil(localComments.length / COMMENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const paginatedComments = localComments.slice(
    startIndex,
    startIndex + COMMENTS_PER_PAGE
  );

  if (!post) return <p>{t("Post not found")}</p>;

  return (
    <section
      className={`${styles.postContainer} ${theme === "dark" ? styles["dark"] : ""}`}
    >
      <PostContent
        title={post.title}
        content={post.content}
        onDelete={handleDeletePost}
      />
      <CommentForm onAddComment={handleAddComment} />
      <CommentList
        comments={paginatedComments}
        onDelete={handleDeleteComment}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
};

export default PostPage;


