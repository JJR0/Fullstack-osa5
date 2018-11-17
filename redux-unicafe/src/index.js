import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const { good, ok, bad } = store.getState()
  const positives = 100 * good / (good + ok + bad)

  if (good === 0 && ok === 0 && bad === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positives.toFixed(2)} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={e => store.dispatch({ type: 'GOOD' })}>hyvä</button>
        <button onClick={e => store.dispatch({ type: 'OK' })}>neutraali</button>
        <button onClick={e => store.dispatch({ type: 'BAD' })}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)