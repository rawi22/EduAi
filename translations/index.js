import en from './en';
import he from './he';
import ar from './ar';

// Create a context for translations
import { createContext, useContext, useState, useEffect } from 'react';

// Available languages
export const languages = {
  english: en,
  hebrew: he,
  arabic: ar
};

// Create the translation context
export const TranslationContext = createContext({
  language: 'english',
  t: (key, params) => key,
  changeLanguage: () => {},
  currentLanguageCode: 'english'
});

// Translation provider component
export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('english');
  
  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') || 'english';
    setLanguage(savedLanguage);
    
    // Set direction for RTL languages
    if (savedLanguage === 'hebrew' || savedLanguage === 'arabic') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
    }
  }, []);
  
  // Translation function
  const t = (key, params = {}) => {
    const translation = languages[language][key];
    
    if (!translation) return key;
    
    // Replace parameters in translation string
    if (Object.keys(params).length) {
      return Object.keys(params).reduce((str, param) => {
        return str.replace(`{${param}}`, params[param]);
      }, translation);
    }
    
    return translation;
  };
  
  // Change language function
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Set direction for RTL languages
    if (newLanguage === 'hebrew' || newLanguage === 'arabic') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
    }
  };
  
  return (
    <TranslationContext.Provider value={{ language, t, changeLanguage, currentLanguageCode: language }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use translations
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export default { TranslationProvider, useTranslation, languages };
