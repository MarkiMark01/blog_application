import { FilterProps } from "../../types/Posts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";
import styles from "../../styles/homepage/filterposts.module.scss";

const FilterPosts: React.FC<FilterProps> = ({ filter, setFilter, setCurrentPage }) => {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <section className={`${styles.filter} ${theme === "dark" ? styles.dark : ""}`}>
      <input
        type="text"
        className={styles.filterInput}
        placeholder={t("Searching for posts...")}
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setCurrentPage(1);
        }}
      />
    </section>
  );
};

export default FilterPosts;



