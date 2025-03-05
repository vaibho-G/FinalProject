import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { translateText } from '../service/translationService';
import '../css/LanguageSelector.css';
const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ja', name: 'Japanese' }
  ];

  const translatePage = async (targetLanguage) => {
    setIsTranslating(true);
    try {
      // Select all elements with the data-translate attribute
      const elements = document.querySelectorAll('[data-translate]');
      
      for (const element of elements) {
        const originalText = element.getAttribute('data-original-text') || element.textContent;
        
        // Store original text if not already stored
        if (!element.getAttribute('data-original-text')) {
          element.setAttribute('data-original-text', originalText);
        }

        // Don't translate if target language is English - revert to original text
        if (targetLanguage === 'en') {
          element.textContent = originalText;
        } else {
          // Translate the text
          const translatedText = await translateText(originalText, targetLanguage);
          element.textContent = translatedText;
        }
      }
    } catch (error) {
      console.error('Translation error:', error);
      alert('Translation failed. Please try again later.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleLanguageChange = async (languageCode) => {
    setSelectedLanguage(languageCode);
    await translatePage(languageCode);
  };

  return (
    <Dropdown className="language-selector">
      <Dropdown.Toggle variant="light" id="dropdown-language" disabled={isTranslating}>
        {isTranslating ? 'Translating...' : 
          languages.find(lang => lang.code === selectedLanguage)?.name || 'Select Language'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {languages.map((language) => (
          <Dropdown.Item 
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            active={selectedLanguage === language.code}
          >
            {language.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;