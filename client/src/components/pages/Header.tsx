import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toggleTheme } from "../redux/themeSlice";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/header.module.scss";

import usa from "../../assets/en.png";
import ua from "../../assets/ua.png";

const LANGUAGE_KEY = "language";

const Header = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      localStorage.setItem(LANGUAGE_KEY, lng);
      setSelectedLanguage(lng);
    });
  };

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        Blog App
      </NavLink>
      <section className={styles.headerBox}>
        <div className={styles.themeSwitch} onClick={() => dispatch(toggleTheme())}>
          <div className={`${styles.slider} ${theme === "dark" ? styles.dark : ""}`}>
            <span className={styles.icon}>{theme === "light" ? "☀" : "🌙"}</span>
          </div>
        </div>
        <div className={styles.btnFlags}>
          <img
            src={usa}
            alt="English"
            onClick={() => changeLanguage("en")}
            className={styles.flags}
            style={{ opacity: selectedLanguage === "en" ? 0.6 : 1 }}
          />
          <img
            src={ua}
            alt="Українська"
            onClick={() => changeLanguage("uk")}
            className={styles.flags}
            style={{ opacity: selectedLanguage === "uk" ? 0.6 : 1 }}
          />
        </div>
      </section>
    </header>
  );
};

export default Header;









