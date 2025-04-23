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
    totalClients: "Clients",
    allRegisteredClients: "All registered clients",
    totalContracts: "Total Contracts",
    activeServiceContracts: "Active service contracts",
    subscriberPoints: "Subscriber Points",
    allRegisteredPoints: "All registered points",
    recentClients: "Recent Clients",
    recentlyAddedClients: "Recently added clients",
    view: "View",
    expiringSoon: "Expiring Soon",
    expiringDesc: "Look up subscriber points and validity dates by Tax Identification Number (TIN)",
    noClients: "No clients added yet.",
    noExpiring: "No subscriber points expiring soon.",
    client: "Client",
    name: "Name",
    expires: "Expires",
    addClient: "Add Client",
    searchTin: "Search by TIN",
    selectLanguage: "Select Language:",
    english: "English",
    russian: "Russian",
    found: "Found",
    forClient: "for client",
    noResults: "No results found for the provided TIN",
    contactPerson: "Contact Person",
    phone: "Phone",
    subscriberPointName: "Subscriber Point Name",
    contractId: "Contract ID",
    validityDate: "Validity Date",
    status: "Status",
    valid: "Valid",
    expired: "Expired",
    noSubscriberPointsFound: "No subscriber points found for this client.",
    noClientFoundTin: "No client found with the provided TIN. Please check the TIN and try again.",
    editClient: "Edit Client",
    clientInformation: "Client Information",
    basicInformation: "Basic information about the client",
    contactInformation: "Contact Information",
    howToReach: "How to reach the client",
    addresses: "Addresses",
    legalAndActual: "Legal and actual addresses",
    contractsAndPoints: "Contracts and Subscriber Points",
    manageContractsPoints: "Manage client contracts and subscriber points",
    networkNumber: "Network Number",
    backToClients: "Back to Clients",
    editClientInformation: "Edit Client Information",
    createNewClient: "Create a New Client",
    contracts: "Contracts",
    addContract: "Add Contract",
    contractNumber: "Contract No.",
    contractDate: "Contract Date",
    date: "Date",
    type: "Type",
    selectType: "Select Type",
    hardware: "HW",
    expiringIn60Days: "Expiring in 60 days",
    expired: "Expired",
    expiringSubscriberPoints: "Expiring Subscriber Points",
    expiredSubscriberPoints: "Expired Subscriber Points",
    daysUntilExpiry: "days until expiry",
    daysExpired: "days expired",
    noExpiringPoints: "No subscriber points expiring soon",
    noExpiredPoints: "No expired subscriber points",
    groupedByClient: "Grouped by client"
  },
  ru: {
    dashboard: "Главная",
    newClient: "Новый клиент",
    tinLookup: "Поиск по ИНН",
    totalClients: "Клиенты",
    allRegisteredClients: "Все зарегистрированные клиенты",
    totalContracts: "Всего договоров",
    activeServiceContracts: "Действующие договоры обслуживания",
    subscriberPoints: "Абонентские точки",
    allRegisteredPoints: "Все зарегистрированные точки",
    recentClients: "Недавно добавленные клиенты",
    recentlyAddedClients: "Недавно добавленные клиенты",
    view: "Просмотр",
    expiringSoon: "Скоро истекают",
    expiringDesc: "Найдите абонентские точки и даты их действия по ИНН",
    noClients: "Клиентов пока нет.",
    noExpiring: "Нет абонентских точек со скорым истечением.",
    client: "Клиент",
    name: "Имя",
    expires: "Cрок действия",
    addClient: "Добавить клиента",
    searchTin: "Поиск по ИНН",
    selectLanguage: "Выберите язык:",
    english: "Английский",
    russian: "Русский",
    found: "Н��йдено",
    forClient: "для клиента",
    noResults: "По вашему запросу не найдено результатов",
    contactPerson: "Контактное лицо",
    phone: "Телефон",
    subscriberPointName: "Имя абонентской точки",
    contractId: "ID договора",
    validityDate: "Дата действия",
    status: "Статус",
    valid: "Действует",
    expired: "Истёк",
    noSubscriberPointsFound: "У этого клиента нет абонентских точек.",
    noClientFoundTin: "Клиент с указанным ИНН не найден. Проверьте ИНН и попробуйте снова.",
    editClient: "Редактировать клиента",
    clientInformation: "Информация о клиенте",
    basicInformation: "Основная информация о клиенте",
    contactInformation: "Контактная информация",
    howToReach: "Как связаться с клиентом",
    addresses: "Адреса",
    legalAndActual: "Юридический и фактический адреса",
    contractsAndPoints: "Договоры и абонентские точки",
    manageContractsPoints: "Управление договорами и абонентскими точками",
    networkNumber: "Номер сети",
    backToClients: "Назад к клиентам",
    editClientInformation: "Редактировать информацию о клиенте",
    createNewClient: "Создать нового клиента",
    contracts: "Договоры",
    addContract: "Добавить договор",
    contractNumber: "Номер договора",
    contractDate: "Дата договора",
    date: "Дата",
    type: "Тип",
    selectType: "Выберите тип",
    hardware: "ОБ",
    expiringIn60Days: "Истекает через 60 дней",
    expired: "Истёк",
    expiringSubscriberPoints: "Истекающие абонентские точки",
    expiredSubscriberPoints: "Истёкшие абонентские точки",
    daysUntilExpiry: "дней до истечения",
    daysExpired: "дней как истёк",
    noExpiringPoints: "Нет абонентских точек с близким сроком истечения",
    noExpiredPoints: "Нет истёкших абонентских точек",
    groupedByClient: "Сгруппировано по клиентам"
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
