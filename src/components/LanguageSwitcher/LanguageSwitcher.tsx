import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon/Icon';

const languages = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = i18n.resolvedLanguage ?? 'ru';

  const handleLanguageChange = (language: string) => {
    void i18n.changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        type="button"
        className="language-switcher__trigger"
        aria-label="Выбрать язык"
        aria-expanded={isOpen}
        aria-controls="language-list"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon name="icon-globe" className="language-switcher__icon" />
        <span className="language-switcher__text">{currentLanguage.toUpperCase()}</span>
        <Icon name="icon-chevron-down" className="language-switcher__down" />
      </button>

      {isOpen && (
        <ul id="language-list" className="language-switcher__list">
          {languages.map((language) => (
            <li key={language.code}>
              <button
                type="button"
                onClick={() => handleLanguageChange(language.code)}
                aria-current={currentLanguage === language.code ? 'true' : undefined}
              >
                {language.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
