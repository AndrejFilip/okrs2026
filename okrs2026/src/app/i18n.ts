"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "./translations";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: translations, // the "messages" namespace
    },
  },
  lng: "en",
  fallbackLng: "en",
  defaultNS: "translations", // <<< this line is important
  ns: ["translations"], // <<< you can also define all namespaces here (optional)
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
