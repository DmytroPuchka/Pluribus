'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useUIStore } from '@/stores/ui';
import enMessages from '@/../messages/en.json';
import ukMessages from '@/../messages/uk.json';

type Messages = typeof enMessages;
type Language = 'en' | 'uk';

interface TranslationsContextType {
  messages: Messages;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

const translations: Record<Language, Messages> = {
  en: enMessages,
  uk: ukMessages,
};

/**
 * Get nested value from object using dot notation
 * Example: get(obj, 'common.buttons.login') => 'Login'
 */
function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return key if path not found
    }
  }

  return typeof result === 'string' ? result : path;
}

/**
 * Replace parameters in translation string
 * Example: "Must be at least {min} characters" with {min: 8} => "Must be at least 8 characters"
 */
function replaceParams(text: string, params?: Record<string, string | number>): string {
  if (!params) return text;

  let result = text;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }

  return result;
}

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const { language, setLanguage: setUILanguage } = useUIStore();
  const [messages, setMessages] = useState<Messages>(translations[language]);

  useEffect(() => {
    setMessages(translations[language]);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setUILanguage(lang);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const text = getNestedValue(messages, key);
    return replaceParams(text, params);
  };

  return (
    <TranslationsContext.Provider value={{ messages, language, setLanguage, t }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error('useTranslations must be used within TranslationsProvider');
  }
  return context;
}
