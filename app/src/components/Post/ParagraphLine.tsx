import React, { ForwardedRef } from "react";
import classes from "./Post.module.css";
import { FeedContext } from "../FeedProvider";
import FeedState from "../../interfaces/feedState";

interface ParagraphLineProps {
  value: string[];
  hasVisibilityToogle?: boolean;
  hasWordSelection?: boolean;
  id: string | number;
  className?: string;
  onWordPress?: (event: unknown) => void;
}

const ParagraphLine = React.forwardRef(
  (
    {
      id,
      value,
      className = "",
      hasWordSelection,
      hasVisibilityToogle,
      onWordPress
    }: ParagraphLineProps,
    ref: ForwardedRef<HTMLUListElement>
  ) => {
    const [visible, setVisible] = React.useState([]);

    React.useEffect(() => {
      setVisible([]);
    }, [value]);

    const toogleVisibility = (index) => {
      if (!hasVisibilityToogle) return;
      if (visible.includes(index)) {
        setVisible([...visible.filter((i) => i !== index)]);
        return;
      }
      setVisible([...visible, index]);
    };

    const lineClasseDefault = classes.paragraph;

    return (
      <ul ref={ref} className={className}>
        {value.map((string, index) => {
          const isVisible = visible.includes(index);
          const lineClasses =
            !isVisible && hasVisibilityToogle ? `${classes.hidden}` : "";
          return (
            <li
              tabIndex={hasVisibilityToogle && 0}
              role="listbox"
              key={`${id}${index}`}
              className={`${lineClasseDefault} ${lineClasses}`}
              onClick={() => toogleVisibility(index)}
              onKeyDown={(event) => {
                // console.log({ event: event.key });
                if (
                  event.key !== "Tab" &&
                  event.key !== "Shift" &&
                  event.key !== "Escape"
                )
                  toogleVisibility(index);
              }}
            >
              <Word
                id={id}
                hasWordSelection={hasWordSelection}
                value={string.split(" ")}
                onWordPress={onWordPress}
              />
            </li>
          );
        })}
      </ul>
    );
  }
);

export default ParagraphLine;

interface WordProps {
  id: string | number;
  value: string[];
  hasWordSelection?: boolean;
  onWordPress?: (event: unknown) => void;
}

function Word({ id, value, hasWordSelection, onWordPress }: WordProps) {
  const [selected, setSelected] = React.useState([]);

  const { setWordsSelected, wordsSelected, postOnDisplay } =
    React.useContext<FeedState>(FeedContext);

  const toogleSelection = (index) => {
    if (!hasWordSelection) return;
    if (selected.includes(index)) {
      setSelected([...selected.filter((i) => i !== index)]);

      setWordsSelected(
        wordsSelected.filter(
          (word) => word.id !== `${postOnDisplay.id}${index}`
        )
      );
      return;
    }
    setSelected([...selected, index]);
    setWordsSelected([
      ...wordsSelected,
      {
        id: `${postOnDisplay.id}${index}`,
        value: value[index]
      }
    ]);
  };

  const lineClasseDefault = `${classes.word} ${
    hasWordSelection ? classes.wordPadding : ""
  }`;
  return (
    <>
      {value.map((word, index) => {
        const isSelected = selected.includes(index);
        const lineClasses =
          isSelected && hasWordSelection ? `${classes.selected}` : "";
        return (
          <span
            tabIndex={hasWordSelection && 0}
            key={`${id}${index}`}
            onClick={() => toogleSelection(index)}
            onKeyDown={(event) => {
              onWordPress && onWordPress(event);
              if (event.key !== "Tab" && event.key !== "Shift")
                toogleSelection(index);
            }}
            className={`${lineClasseDefault} ${lineClasses}`}
          >
            {word}{" "}
          </span>
        );
      })}
    </>
  );
}
