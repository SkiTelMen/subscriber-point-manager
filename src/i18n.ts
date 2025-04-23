
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources - only keeping Russian
const resources = {
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
      noSubscriberPoints: "Нет доступных абонентских точек",
      
      // Table view
      search: "Поиск",
      filter: "Фильтр",
      reset: "Сбросить",
      customerName: "Имя клиента",
      tin: "ИНН",
      pointName: "Название точки",
      pointValidity: "Срок действия",
      sortAsc: "По возрастанию",
      sortDesc: "По убыванию",
      clearFilter: "Очистить фильтр",
      applyFilter: "Применить фильтр",
      subscriberPointsList: "Список абонентских точек",
      allSubscriberPoints: "Все абонентские точки"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    lng: 'ru', // Force Russian as default
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
