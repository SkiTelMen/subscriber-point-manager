
import React from "react";
import { useLocale } from "@/context/LocaleContext";

const LanguageSelector = () => {
  const { locale, setLocale, t } = useLocale();

  // Since we only have Russian now, we'll set it directly
  React.useEffect(() => {
    if (locale !== 'ru') {
      setLocale('ru');
    }
  }, [locale, setLocale]);

  return (
    <div className="flex items-center gap-2 mb-4">
      <label className="text-sm text-muted-foreground">{t("selectLanguage")}</label>
      <select
        value={locale}
        onChange={e => setLocale(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="ru">{t("russian")}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
