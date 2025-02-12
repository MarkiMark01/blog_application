import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ukr } from "./languages/ukr";
import { eng } from "./languages/eng";

const LANGUAGE_KEY = "language";
const DEFAULT_LANGUAGE = "en";
const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: eng.translation }, 
    uk: { translation: ukr.translation },
  },
  lng: savedLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
});

export default i18n;



