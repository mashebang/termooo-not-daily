import { useState, useCallback, useEffect } from 'react';
const letterRegex = /[a-zA-Z]/

const Word = ({ values, setValues, isInput }) => {
  const [focused, setFocused] = useState(0)
  const setFocusOnPrevious = useCallback(() => {
    setFocused(f => f - 1 > 0 ? f - 1 : 0)
  }, [])

  const setFocusOnNext = useCallback(() => {
    setFocused(f => (Number(f) + 1) >= 5  ? f : Number(f) + 1)
  }, [])

  const onChange = useCallback((e) => {
    e.persist()
    const id = e.target.id;
    const letter = e.target.value;
    if (letter && !(letterRegex.test(letter)))
      return

    setValues(values => {
      const newValues = [...values]
      newValues[id] = letter;
      return newValues
    })

    // if input is filled, should focus on next input (noop if is the last input)
    if (letter.length === 1) setFocusOnNext()
  }, [setValues, setFocusOnNext])

  const onClick = useCallback((e) => {
    e.persist()
    setFocused(e.target.id)
  }, [])

  useEffect(() => {
    document.getElementById(focused).focus()
  }, [focused])

  const onKeyDown = useCallback((e) => {
    e.persist()
    console.log(e)
    const { key, target: { value, id } } = e
    if (key === 'Backspace' || key === 'Delete') {
      setFocusOnPrevious()
    }

    if (key.length === 1 && letterRegex.test(key) && value.length > 0) {
        setValues(values => {
            const newValues = [...values]
            newValues[id] = key;
            return newValues
        })
        setFocusOnNext()
    }
  }, [setFocusOnPrevious, setFocusOnNext, setValues])

  return (
    <div className="word-container">
      {
        Array(5).fill().map((_, k) => (
          <input
            key={k}
            id={k}
            maxLength={1}
            value={values[k]}
            disabled={!isInput}
            onClick={onClick}
            onKeyDown={onKeyDown}
            onChange={onChange} /> 
        ))
      }
    </div>
  )
}

export default Word;