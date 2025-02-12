export interface Comment {
    id: number;
    content: string;
    postId: number;
  }
  
  export interface Post {
    id: number;
    title: string;
    content: string;
    comments?: Comment[];
  }
  
  export interface PostFormProps {
    handleCreatePost: (title: string, content: string) => void;
  }
  
  export interface PostItemProps {
    post: Post;
    handleDeletePost: (id: number) => void;
  }
  
  export interface PostListProps {
    posts: Post[];
    handleDeletePost: (id: number) => void;
  }
  
  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
  }
  
  export interface FilterProps {
    filter: string;
    setFilter: (filter: string) => void;
    setCurrentPage: (page: number) => void;
  }
  
  export interface PostsState {
    posts: Post[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }
  export interface Post {
    id: number;
    title: string;
    content: string;
    comments?: Comment[];
  }
  
  export interface PostFormProps {
    handleCreatePost: (title: string, content: string) => void;
  }
  
  export interface PostItemProps {
    post: Post;
    handleDeletePost: (id: number) => void;
  }
  
  export interface PostListProps {
    posts: Post[];
    handleDeletePost: (id: number) => void;
  }
  
  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
  }
  
  export interface FilterProps {
    filter: string;
    setFilter: (filter: string) => void;
    setCurrentPage: (page: number) => void;
  }
  
  export interface Comment {
    id: number;
    content: string;
    postId: number;
  }
  
  export interface PostContentProps {
    title: string;
    content: string;
    onDelete: () => void;
  }
  export interface CommentFormProps {
    onAddComment: (content: string) => void;
  }
  