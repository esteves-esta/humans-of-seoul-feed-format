import React from 'react';
import FeedState from '../../interfaces/feedState';
import { FeedContext } from '../FeedProvider'
import classes from './Post.module.css'

function Post() {
  const { postOnDisplay } = React.useContext<FeedState>(FeedContext)

  const { korSplit, kor, engSplit, id, pubDate } = postOnDisplay

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US').replace(/\//g, '.')
  }

  return (
    <article className={classes.postContainer}>
      <h3>{formatDate(pubDate)}</h3>
      <section>
        <div>
          <ParagraphLine id={id} value={korSplit} hasWordSelection={true} />
          <p>
            {kor.split(' ').length} words
          </p>
        </div>

        <ParagraphLine className={classes.translation} id={id} hasVisibilityToogle={true} value={engSplit} />
      </section>
    </article>
  )
}

interface ParagraphLineProps {
  value: string[],
  hasVisibilityToogle?: boolean
  hasWordSelection?: boolean
  id: string | number
  className?: string
}

function ParagraphLine({ id, value, className = '', hasWordSelection, hasVisibilityToogle }: ParagraphLineProps) {
  const [visible, setVisible] = React.useState([]);

  React.useEffect(() => {
    setVisible([])
  }, [value])

  const toogleVisibility = (index) => {
    if (!hasVisibilityToogle) return
    if (visible.includes(index)) {
      setVisible([...visible.filter(i => i !== index)])
      return
    }
    setVisible([...visible, index])
  }

  const lineClasseDefault = classes.paragraph

  return (
    <ul className={className}>
      {value.map((string, index) => {
        const isVisible = visible.includes(index)
        const lineClasses = !isVisible && hasVisibilityToogle ? `${classes.hidden}` : '';
        return (
          <li
            key={`${id}${index}`}
            className={`${lineClasseDefault} ${lineClasses}`}
            onClick={() => toogleVisibility(index)}
          >
            <Word
              id={id}
              hasWordSelection={hasWordSelection}
              value={string.split(' ')} />
          </li>
        )
      })}
    </ul>
  )

}

interface WordProps { id: string | number, value: string[], hasWordSelection?: boolean }

function Word({ id, value, hasWordSelection }: WordProps) {
  const [selected, setSelected] = React.useState([]);
  const { setWordsSelected, wordsSelected, postOnDisplay } = React.useContext<FeedState>(FeedContext)

  const toogleSelection = (index) => {
    if (!hasWordSelection) return
    if (selected.includes(index)) {
      setSelected([...selected.filter(i => i !== index)])

      setWordsSelected(wordsSelected.filter(word => word.id !== `${postOnDisplay.id}${index}`))
      return
    }
    setSelected([...selected, index])
    setWordsSelected([
      ...wordsSelected,
      {
        id: `${postOnDisplay.id}${index}`,
        value: value[index]
      }
    ])
  }

  const lineClasseDefault = `${classes.word} ${hasWordSelection ? classes.wordPadding : ''}`
  return (<>
    {value.map((word, index) => {
      const isSelected = selected.includes(index)
      const lineClasses = isSelected && hasWordSelection ? `${classes.selected}` : '';
      return (<span
        key={`${id}${index}`}
        onClick={() => toogleSelection(index)}
        className={`${lineClasseDefault} ${lineClasses}`}>
        {word}{" "}
      </span>)
    })}
  </>
  )

}

export default Post;
