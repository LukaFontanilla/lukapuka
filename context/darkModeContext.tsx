import React, {createContext, useContext} from 'react'
import useDarkMode, {DarkMode} from 'use-dark-mode';

// ignoring error highlighting here, typescript is just complaining about type unknown since no default value is specified
// @ts-expect-error
const darkModeContext: React.Context<DarkMode> = createContext();

// what's a good type declaration for the children prop ?
export const DarkModeWrapper: React.FC = ({ children }) => {
    /*
    use darkmode hook provides 3 properties:
    - value: the boolean value (true = dark, false = light)
    - enabled: function to toggle dark mode
    - disabled: function to toggle light mode
    */ 
    const darkMode = useDarkMode(true);
  
    return (
      <darkModeContext.Provider value={darkMode}>
        {children}
      </darkModeContext.Provider>
    )
}
  
export const useDarkModeContext = (): DarkMode => {
  return useContext(darkModeContext);
}