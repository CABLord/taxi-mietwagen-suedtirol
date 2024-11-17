
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import en from '../lang/en.json';
import de from '../lang/de.json';

const languages = { en, de };

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState('de'); // Default to German

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <IntlProvider messages={languages[locale]} locale={locale}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
