import React, { createContext, useContext, ReactNode } from 'react';

export const MondayLight = {
  mode: 'light',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#F8F9FB',
  textPrimary: '#050505',
  textSecondary: '#6B6B6B',
  tableHeaderBg: '#F5F6F8',
  tableBorder: '#E2E4E9',
  primaryAccent: '#0073EA',
  success: '#00C875',
  warning: '#FFCB00',
  danger: '#E2445C',
  info: '#579BFC',
  grey: '#C4C4C4',
  borderRadius: 8,
  fontFamily: 'Roboto, sans-serif',
  fontSize: 14
};

const ThemeContext = createContext(MondayLight);

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={MondayLight}>
      <div style={{ 
        backgroundColor: MondayLight.background,
        color: MondayLight.textPrimary,
        fontFamily: MondayLight.fontFamily,
        fontSize: MondayLight.fontSize,
        minHeight: '100vh'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};