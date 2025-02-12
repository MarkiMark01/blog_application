import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./loader/Loader";

const HomePage = lazy(() => import("./pages/homepage/HomePage"));
const PostPage = lazy(() => import("./pages/postpage/PostPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;

