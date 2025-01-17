import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../public/locales/en/translation.json";
import bem from "../../public/locales/bem/translation.json";
import nya from "../../public/locales/nya/translation.json";

// import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const savedLanguage = localStorage.getItem('language') || 'en';

const resources = {
    en: {
        translation: en
    },
    bem: {
        translation: bem
    },
    nya: {
        translation: nya
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: "en",
        resources,
        lng: savedLanguage, // Use saved language
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
