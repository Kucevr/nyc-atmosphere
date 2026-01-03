import React, { createContext, useContext, useState, ReactNode } from 'react';
import { content, Language } from '../data/content';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof content['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const value = {
    language,
    setLanguage,
    t: content[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
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