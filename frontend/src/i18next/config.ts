import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const queryParameters = new URLSearchParams(window.location.search);
const lang = queryParameters.get("l");
i18next.use(initReactI18next).init({
  lng: lang || "en",
  fallbackLng: "en",
  debug: false,
  resources: {
    en: {
      translation: {
        tabFreeTextEnty: "Free-text entry",
        tabTreeView: "Select using tree structure",
        search : "Search",
        searchResult : "Search result",
        enterSearch : "Enter search",
        defectPlace: "Defect place",
        defectType: "Defect type",
        defectLocationVehicle: "Defect location, vehicle",
        defectLocationPart: "Defect location, part",
        defectCondition: "Defect condition",
        selectedDefectSymptom: "Selected defect symptom",
        btnAccept: "Accept",
        btnCancel: "Cancel",
        btnDeleteSelection: "Delete selection",
        constructiveType : "Constructive",
        functionalType : "Functional",
        fulltext : 'Fulltext (Search term)'
      },
    },
    de: {
      translation: {
        tabFreeTextEnty: "Freitextangabe",
        tabTreeView: "Auswahl über Baumstruktur",
        search : "Suchen",
        searchResult : "Suchergebnis",
        enterSearch : "Eingabe Suche",
        defectPlace: "Fehlerort",
        defectType: "Fehlerart",
        defectLocationVehicle: "Fehlerlage Fahrzeug",
        defectLocationPart: "Fehlerlage Bauteil",
        defectCondition: "Fehlerbedingung",
        selectedDefectSymptom: "Ausgewählte Fehlerbild",
        btnAccept: "Übernehmen",
        btnCancel: "Abbrechnen",
        btnDeleteSelection: "Auswahl löschen",
        constructiveType : "Konstruktiv",
        functionalType : "Funktional",
        fulltext : 'Fulltext (Suchbegriff)'
      },
    },
  },
});
