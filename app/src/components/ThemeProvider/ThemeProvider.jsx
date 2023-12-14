import React from 'react';

export const ThemeContext = React.createContext();
// const localStorageKey = 'feed-posts'

function ThemeProvider({ children }) {
  const [color, setColor] = React.useState('teste1')
  const [fontSize, setFontSize] = React.useState([1.4])
  const [font, setFont] = React.useState('Gowun Batang')
  const [fontWeight, setFontWeight] = React.useState([400])
  const [lineHeight, setlineHeight] = React.useState([1.8])
  const [wordSpacing, setWordSpacing] = React.useState([0])


  function themeReset() {
    setColor('teste1');
    setFontSize([1.4]);
    setFont('Gowun Batang');
    setFontWeight([400]);
    setlineHeight([1.8]);
    setWordSpacing([0]);
  }

  const state = {
    color,
    setColor,
    font,
    setFont,
    fontSize,
    setFontSize,
    fontWeight,
    setFontWeight,
    lineHeight,
    setlineHeight,
    wordSpacing,
    setWordSpacing,
    themeReset
  };

  return <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
