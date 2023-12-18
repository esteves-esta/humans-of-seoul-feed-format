import React, { ForwardedRef } from "react";
import classes from "./Post.module.css";
import { FeedContext } from "../FeedProvider";
import FeedState from "../../interfaces/feedState";
import * as HoverCard from "@radix-ui/react-hover-card";
import { ExternalLink } from "lucide-react";
import { ThemeContext } from "../ThemeProvider";
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
                if (
                  event.key !== "Tab" &&
                  event.key !== "Shift" &&
                  event.key !== "Escape"
                )
                  toogleVisibility(index);
              }}
            >
              <Word
                lineIndex={index}
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
  lineIndex: number;
  value: string[];
  hasWordSelection?: boolean;
  onWordPress?: (event: unknown) => void;
}

function Word({
  id,
  value,
  hasWordSelection,
  onWordPress,
  lineIndex
}: WordProps) {
  const { container } = React.useContext(ThemeContext);
  const { setWordsSelected, wordsSelected } =
    React.useContext<FeedState>(FeedContext);

  const [lineSelected, setLineSelected] = React.useState(() => {
    if (wordsSelected[id] && wordsSelected[id][lineIndex])
      return wordsSelected[id][lineIndex];
    return [];
  });

  const toogleSelection = (index) => {
    if (!hasWordSelection) return;
    const newWords = { ...wordsSelected };
    let selected = [];
    if (!newWords[id]) newWords[id] = { [lineIndex]: [] };

    if (newWords[id][lineIndex] !== undefined)
      selected = [...newWords[id][lineIndex]];

    if (selected.includes(index))
      newWords[id][lineIndex] = [...selected.filter((i) => i !== index)];
    else newWords[id][lineIndex] = [...selected, index];
    setLineSelected([...newWords[id][lineIndex]]);
    setWordsSelected(newWords);
  };

  const lineClasseDefault = `${classes.word} ${
    hasWordSelection ? classes.wordPadding : ""
  }`;
  return (
    <>
      {value.map((word, index) => {
        const isSelected = lineSelected.includes(index);
        const lineClasses =
          isSelected && hasWordSelection ? `${classes.selected}` : "";
        return (
          <HoverCard.Root key={`${id}${index}`}>
            <HoverCard.Trigger asChild>
              <span
                tabIndex={hasWordSelection && 0}
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
            </HoverCard.Trigger>
            <HoverCard.Portal container={container}>
              {hasWordSelection && (
                <HoverCard.Content
                  className={classes.HoverCardContent}
                  sideOffset={5}
                >
                  <button
                    onClick={() =>
                      window.open(
                        ` https://papago.naver.com/?sk=ko&tk=en&st=${word} `,
                        "_blank"
                      )
                    }
                  >
                    <ExternalLink /> search on papago
                  </button>
                  <HoverCard.Arrow className={classes.HoverCardArrow} />
                </HoverCard.Content>
              )}
            </HoverCard.Portal>
          </HoverCard.Root>
        );
      })}
    </>
  );
}
