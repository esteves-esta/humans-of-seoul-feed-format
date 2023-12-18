import { Slash, BadgeInfo, Settings, RotateCcw } from "lucide-react";
import React from "react";
import LateralModal from "../LateralModal";
import SelectBox from "../SelectBox";
import SliderCustom from "../SliderCustom";
import { ThemeContext } from "../ThemeProvider";
import classes from "./Styles.module.css";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

function Header() {
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openThemeSettings, setOpenThemeSettings] = React.useState(false);

  const {
    color,
    setColor,
    fontSize,
    setFontSize,
    fontWeight,
    setFontWeight,
    lineHeight,
    setlineHeight,
    font,
    setFont,
    wordSpacing,
    setWordSpacing,
    themeReset
  } = React.useContext(ThemeContext);

  const fonts = {
    "Nanum Myeongjo": [400, 700, 800],
    "Gothic A1": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    "Noto Sans KR": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    "Noto Serif KR": [200, 300, 400, 500, 600, 700, 800, 900],
    "Nanum Gothic Coding": [400, 700],
    "Gowun Batang": [400, 700],
    "Cute Font": [400],
    Diphylleia: [400],
    "Gowun Dodum": [400],
    "Song Myung": [400],
    Stylish: [400]
  };

  const fontFamilies = Object.keys(fonts);

  return (
    <header className={classes.header}>
      <h1 className={classes.title}>
        휴먼스 오브 서울 <Slash />
        <span>Humans of seoul</span>
      </h1>

      <nav>
        <button className="IconButton" onClick={() => setOpenInfo(true)}>
          <BadgeInfo />
          <VisuallyHidden.Root>About the tsite</VisuallyHidden.Root>
        </button>
        <button
          className="IconButton"
          onClick={() => setOpenThemeSettings(true)}
        >
          <Settings />
          <VisuallyHidden.Root>Customization</VisuallyHidden.Root>
        </button>
      </nav>

      <LateralModal title="About" open={openInfo} setOpen={setOpenInfo}>
        <p>This website is populated by Humans of Seoul RSS feed.</p>
        <p>This project was made for:</p>
        <ul>
          <li>To practice my frontend skill</li>
          <li>
            To practice my reading skills in korean, so I can read first the
            original korean text to try to understand it.
          </li>
        </ul>
      </LateralModal>
      <LateralModal
        title="Customization"
        open={openThemeSettings}
        setOpen={setOpenThemeSettings}
      >
        <button className={classes.ResetButton} onClick={themeReset}>
          <RotateCcw size={20} />
          reset
        </button>

        <div className={classes.Field}>
          <label htmlFor="theme">Color Theme</label>
          <SelectBox
            id="theme"
            value={color}
            onValueChange={setColor}
            placeholder="Choose a theme"
            label="Theme"
            options={[
              "yellowSunrise",
              "greenyMountain",
              "beachyDay",
              "nightSky",
              "pinkyClounds"
            ]}
          />
        </div>

        <div className={classes.Field}>
          <label htmlFor="fonts">Font</label>
          <SelectBox
            id="fonts"
            value={font}
            onValueChange={setFont}
            placeholder="Choose a font"
            label="Theme"
            options={fontFamilies}
          />
        </div>

        <div className={classes.Field}>
          <label htmlFor="fontSize">Font Size</label>
          <SliderCustom
            id="fontSize"
            value={fontSize}
            onValueChange={setFontSize}
            min={1}
            max={2}
            step={0.1}
          />
        </div>

        {fonts[font].length > 1 && (
          <div className={classes.Field}>
            <label htmlFor="fontWeight">Font Weight</label>
            <SliderCustom
              id="fontWeight"
              value={fontWeight}
              onValueChange={setFontWeight}
              max={fonts[font].at(-1)}
              min={fonts[font].at(0)}
              step={100}
            />{" "}
          </div>
        )}

        <div className={classes.Field}>
          <label htmlFor="lineHeight">Line spacing</label>
          <SliderCustom
            id="lineHeight"
            value={lineHeight}
            onValueChange={setlineHeight}
            max={3}
            min={1}
            step={0.5}
          />
        </div>

        <div className={classes.Field}>
          <label htmlFor="wordSpacing">Word spacing</label>
          <SliderCustom
            id="wordSpacing"
            value={wordSpacing}
            onValueChange={setWordSpacing}
            max={2}
            min={0}
            step={0.15}
          />{" "}
        </div>
      </LateralModal>
    </header>
  );
}

export default Header;
