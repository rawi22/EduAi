import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
    
    // Set text direction based on language
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    
    // You might want to save the language preference to localStorage
    localStorage.setItem('language', lng);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 p-2 rounded-md hover:bg-gray-100"
      >
        <Globe className="w-5 h-5" />
        <span className="ml-1">{t('settings.language')}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={() => changeLanguage('ar')}
              className={`block w-full text-right px-4 py-2 text-sm ${
                i18n.language === 'ar' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700'
              } hover:bg-gray-100`}
            >
              {t('settings.arabic')}
            </button>
            <button
              onClick={() => changeLanguage('he')}
              className={`block w-full text-right px-4 py-2 text-sm ${
                i18n.language === 'he' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700'
              } hover:bg-gray-100`}
            >
              {t('settings.hebrew')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}