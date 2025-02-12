import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../styles/nofoundpage.module.scss";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <section className={styles["not-found"]}>
      <h1>404</h1>
      <h2>{t("Page not found")}</h2>
      <p>{t("It looks like you got lost 🤔")}</p>
      <Link to="/" className={styles["back-link"]}>
        ⬅ {t("Return to the homepage")}
      </Link>
    </section>
  );
};

export default NotFoundPage;

