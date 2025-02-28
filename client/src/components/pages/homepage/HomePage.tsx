import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchPosts, createPost, deletePost } from "../../redux/postsOperations";
import { RootState, AppDispatch } from "../../redux/store";
import PostList from "./PostList";
import PostForm from "./PostForm";
import Filter from "./FilterPosts";
import Pagination from "./Pagination";
import { toast } from "react-hot-toast";
import styles from '../../styles/homepage/homepage.module.scss';

const POSTS_PER_PAGE = 10;

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, error } = useSelector((state: RootState) => state.posts);
  const theme = useSelector((state: RootState) => state.theme.mode);

  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const handleCreatePost = async (title: string, content: string) => {
    try {
      await dispatch(createPost({ title, content })).unwrap();
      toast.success("Post successfully created!");
      setFilter(""); 
    } catch (err) {
      toast.error("Error adding comment");
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await dispatch(deletePost(id)).unwrap();
      toast.success("Post successfully deleted");
    } catch (err) {
      toast.error("Error deleting post");
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <section className={`${styles.homeContainer} ${theme === "dark" ? styles.dark : ""}`}>
      <PostForm handleCreatePost={handleCreatePost} />
      <Filter filter={filter} setFilter={setFilter} setCurrentPage={setCurrentPage} />
      <PostList posts={paginatedPosts} handleDeletePost={handleDeletePost} />
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

      {status === "failed" && toast.error(`Помилка: ${error}`)}
    </section>
  );
};

export default HomePage;







