import React from "react";
import useStickyState from "../../hooks/useStickyState";

export const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [color, setColor] = useStickyState("beachyDay", "hos-filter-theme");
  const [fontSize, setFontSize] = useStickyState([1.5], "hos-filter-fontsize");
  const [font, setFont] = useStickyState(
    "Nanum Myeongjo",
    "hos-filter-fontfamily"
  );
  const [fontWeight, setFontWeight] = useStickyState(
    [800],
    "hos-filter-fontweight"
  );
  const [lineHeight, setlineHeight] = useStickyState(
    [1.8],
    "hos-filter-lineheight"
  );
  const [wordSpacing, setWordSpacing] = useStickyState(
    [0],
    "hos-filter-wordspacing"
  );
const [container, setContainer] = React.useState(null);
  function themeReset() {
    setColor("teste2");
    setFontSize([1.4]);
    setFont("Gowun Batang");
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
    themeReset,
    container,
    setContainer,
  };

  return (
    <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
