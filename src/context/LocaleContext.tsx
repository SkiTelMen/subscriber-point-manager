
import React, { createContext, useContext, useState, ReactNode } from "react";

type Locale = "en" | "ru";
interface LocaleContextProps {
  locale: Locale;
  setLocale: (lang: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    newClient: "New Client",
    tinLookup: "TIN Lookup",
    totalClients: "Total Clients",
    allRegisteredClients: "All registered clients",
    totalContracts: "Total Contracts",
    activeServiceContracts: "Active service contracts",
    subscriberPoints: "Subscriber Points",
    allRegisteredPoints: "All registered points",
    recentClients: "Recent Clients",
    recentlyAddedClients: "Recently added clients",
    view: "View",
    expiringSoon: "Expiring Soon",
    expiringDesc: "Subscriber points expiring in the next 30 days",
    noClients: "No clients added yet.",
    noExpiring: "No subscriber points expiring soon.",
    client: "Client",
    expires: "Expires",
    addClient: "Add Client",
    searchTin: "Search by TIN",
    selectLanguage: "Select Language:",
    english: "English",
    russian: "Russian",
  },
  ru: {
    dashboard: "Главная",
    newClient: "Новый клиент",
    tinLookup: "Поиск по ИНН",
    totalClients: "Всего клиентов",
    allRegisteredClients: "Все зарегистрированные клиенты",
    totalContracts: "Всего договоров",
    activeServiceContracts: "Действующие договоры обслуживания",
    subscriberPoints: "Абонентские точки",
    allRegisteredPoints: "Все зарегистрированные точки",
    recentClients: "Недавно добавленные клиенты",
    recentlyAddedClients: "Недавно добавленные клиенты",
    view: "Просмотр",
    expiringSoon: "Скоро истекают",
    expiringDesc: "Абонентские точки, срок действия истекает в ближайшие 30 дней",
    noClients: "Клиентов пока нет.",
    noExpiring: "Нет абонентских точек со скорым истечением.",
    client: "Клиент",
    expires: "Cрок действия",
    addClient: "Добавить клиента",
    searchTin: "Поиск по ИНН",
    selectLanguage: "Выберите язык:",
    english: "Английский",
    russian: "Русский",
  }
};

const LocaleContext = createContext<LocaleContextProps>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
});

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("en");

  const t = (key: string) => {
    return translations[locale][key] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

