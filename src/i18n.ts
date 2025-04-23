
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Dashboard
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
      noClients: "No clients available",
      
      // Language Selector
      selectLanguage: "Select Language",
      english: "English",
      russian: "Russian",
      
      // Contract-related
      contracts: "Contracts",
      addContract: "Add Contract",
      contractNumber: "Contract Number",
      contractDate: "Contract Date",
      cancel: "Cancel",
      add: "Add",
      noContracts: "No contracts available",
      date: "Date",
      
      // Subscriber points
      expiringSubscriberPoints: "Expiring Subscriber Points",
      expiredSubscriberPoints: "Expired Subscriber Points",
      noExpiringPoints: "No subscriber points expiring soon",
      noExpiredPoints: "No expired subscriber points",
      networkNumber: "Network Number",
      type: "Type",
      client: "Client",
      hardware: "HW",
      validityDate: "Validity Date",
      validUntil: "Valid Until",
      daysExpired: "days expired",
      daysUntilExpiry: "days until expiry",
      addSubscriberPoint: "Add Subscriber Point",
      subscriberPointName: "Subscriber Point Name",
      selectType: "Select Type",
      noSubscriberPoints: "No subscriber points available"
    }
  },
  ru: {
    translation: {
      // Dashboard
      dashboard: "Панель управления",
      newClient: "Новый клиент",
      tinLookup: "Поиск по ИНН",
      totalClients: "Всего клиентов",
      allRegisteredClients: "Все зарегистрированные клиенты",
      totalContracts: "Всего контрактов",
      activeServiceContracts: "Активные сервисные контракты",
      subscriberPoints: "Абонентские точки",
      allRegisteredPoints: "Все зарегистрированные точки",
      recentClients: "Недавние клиенты",
      recentlyAddedClients: "Недавно добавленные клиенты",
      view: "Просмотр",
      noClients: "Нет доступных клиентов",
      
      // Language Selector
      selectLanguage: "Выбрать язык",
      english: "Английский",
      russian: "Русский",
      
      // Contract-related
      contracts: "Контракты",
      addContract: "Добавить контракт",
      contractNumber: "Номер контракта",
      contractDate: "Дата контракта",
      cancel: "Отмена",
      add: "Добавить",
      noContracts: "Нет доступных контрактов",
      date: "Дата",
      
      // Subscriber points
      expiringSubscriberPoints: "Истекающие абонентские точки",
      expiredSubscriberPoints: "Истекшие абонентские точки",
      noExpiringPoints: "Нет истекающих абонентских точек",
      noExpiredPoints: "Нет истекших абонентских точек",
      networkNumber: "Сетевой номер",
      type: "Тип",
      client: "Клиент",
      hardware: "ОБ",
      validityDate: "Срок действия",
      validUntil: "Действительно до",
      daysExpired: "дней истекло",
      daysUntilExpiry: "дней до истечения срока",
      addSubscriberPoint: "Добавить абонентскую точку",
      subscriberPointName: "Название абонентской точки",
      selectType: "Выберите тип",
      noSubscriberPoints: "Нет доступных абонентских точек"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
