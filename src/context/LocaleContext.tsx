
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, options?: any) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const [locale, setLocale] = useState(i18n.language);

  const changeLocale = useCallback(
    (newLocale: string) => {
      i18n.changeLanguage(newLocale).then(() => {
        setLocale(newLocale);
      });
    },
    []
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale: changeLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
