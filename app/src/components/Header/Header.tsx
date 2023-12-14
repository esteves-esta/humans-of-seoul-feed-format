import { Slash, BadgeInfo, Settings } from 'lucide-react'
import React from 'react';
import LateralModal from '../LateralModal';
import SelectBox from '../SelectBox';
import SliderCustom from '../SliderCustom';
import { ThemeContext } from '../ThemeProvider';

function Header() {
  const [openInfo, setOpenInfo] = React.useState(false)
  const [openThemeSettings, setOpenThemeSettings] = React.useState(false)

  const { color,
    setColor,
    fontSize,
    setFontSize,
    fontWeight,
    setFontWeight,
    lineHeight,
    setlineHeight,
    font, setFont,
    wordSpacing, setWordSpacing,
    themeReset
  } = React.useContext(ThemeContext)

  return <header>
    <h1>휴먼스 오브 서울 <Slash />Humans of seoul </h1>

    <nav>
      <button onClick={() => setOpenInfo(true)}>
        <BadgeInfo />
      </button>
      <button onClick={() => setOpenThemeSettings(true)}>
        <Settings />
      </button>
    </nav>
    <LateralModal title="About" open={openInfo} setOpen={setOpenInfo} >
      <p>This website is populate by Humans of Seoul RSS feed.</p>
      <p>This project was made for:</p>
      <ul>
        <li>Practice my frontend skill</li>
        <li>Practice my reading of korean and be able to only see the original korean text first to try to translate it first by myself.</li>
      </ul>
    </LateralModal>
    <LateralModal title="Theme customization" open={openThemeSettings} setOpen={setOpenThemeSettings} >
      <button onClick={themeReset}>
        reset
      </button>
      <hr />
      <div>
        <label htmlFor="theme">color theme - {color}</label>
        <SelectBox
          id='theme'
          value={color}
          onValueChange={setColor}
          placeholder="Choose a theme"
          label="Theme"
          options={['teste', 'teste1']}
        />
      </div>

      <hr />

      <div>
        <label htmlFor="theme"> {font}</label>
        <SelectBox
          id='theme'
          value={font}
          onValueChange={setFont}
          placeholder="Choose a font"
          label="Theme"
          options={['Cute Font',
            'Diphylleia',
            'Gothic A1',
            'Gowun Batang',
            'Gowun Dodum',
            'Nanum Gothic Coding',
            'Nanum Myeongjo',
            'Noto Sans KR',
            'Noto Serif KR',
            'Song Myung',
            'Stylish']}
        />
      </div>

      <hr />

      <p>font size - {fontSize}</p>
      <SliderCustom
        value={fontSize}
        onValueChange={setFontSize}
        min={1}
        max={2}
        step={0.1} />

      <hr />
      <p>{fontWeight}</p>
      <SliderCustom
        value={fontWeight}
        onValueChange={setFontWeight}
        max={900}
        min={300}
        step={100} />
      <hr />
      <p>{lineHeight}</p>
      <SliderCustom
        value={lineHeight}
        onValueChange={setlineHeight}
        max={3}
        min={1}
        step={0.5} />
      <hr />
      <p>{wordSpacing}</p>
      <SliderCustom
        value={wordSpacing}
        onValueChange={setWordSpacing}
        max={2}
        min={0}
        step={0.15} />
    </LateralModal>
  </header>;
}


export default Header;
