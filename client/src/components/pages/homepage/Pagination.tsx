import { useSelector } from "react-redux";

import LeftArrow from "../../icons/LeftArrow";
import RightArrow from "../../icons/RightArrow";
import { RootState } from "../../redux/store";
import { PaginationProps } from "../../types/Posts";
import styles from "../../styles/homepage/pagination.module.scss";

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  const theme = useSelector((state: RootState) => state.theme.mode);

  if (totalPages <= 1) return null;

  return (
    <section className={`${styles.paginationBox} ${theme === "dark" ? styles.dark : ""}`}>
      <div className={`${styles.pagination} ${theme === "dark" ? styles.dark : ""}`}>
        <button
          className={`${styles.button} ${theme === "dark" ? styles.dark : ""}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <LeftArrow/>
        </button>
        <span className={`${styles.pageInfo} ${theme === "dark" ? styles.dark : ""}`}>
          {currentPage} з {totalPages}
        </span>
        <button
          className={`${styles.button} ${theme === "dark" ? styles.dark : ""}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <RightArrow/>
        </button>
      </div>
    </section>
  );
};

export default Pagination;




  
  