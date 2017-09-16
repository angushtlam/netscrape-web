import React from 'react'
import ReactDOM from 'react-dom'

import './styles/index.scss'

import Form from './components/form'
import Hero from './components/hero'
import WaveShape from './styles/react/shape/wave'

class App extends React.Component {
  render() {
    return (
      <div>
        <Hero />
        <WaveShape bottomColor="#d13c6b" topColor="#fff" />
        <Form />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
