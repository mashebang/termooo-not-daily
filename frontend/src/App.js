import { useState, useCallback } from 'react';
import './App.css';
import Word from './components/Word';
import Tries from './components/Tries';

function App() {
  const [values, setValues] = useState(Array(5).fill(""))
  const [tries, setTries] = useState(Array(5).fill(""))
  const [error, setError] = useState()

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    setError()
    if (values.some(e => !e)) setError("preencha todos os espacos")
  }, [values])

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmit}>
          <Word
            isInput
            values={values}
            setValues={setValues}
          />
          <button type='submit'>SUBMIT</button>
          <br></br>
          <small color="tomato">{error}</small>
        </form>
      </header>
    </div>
  );
}

export default App;
