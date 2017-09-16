import React from 'react'
import ReactDOM from 'react-dom'

import './styles/index.scss'

import Form from './components/form'
import Hero from './components/hero'
import CloudsShapeDivider from './styles/react/shape_divider/clouds'
import WaveShapeDivider from './styles/react/shape_divider/wave'

class App extends React.Component {
  render() {
    return (
      <div>
        <Hero />
        <WaveShapeDivider bottomColor="#d13c6b" topColor="#fff" />
        <Form />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
