import 'babel-polyfill'
import 'isomorphic-fetch'

import React from 'react'
import ReactDOM from 'react-dom'

import './styles/index.scss'

import Form from './components/form'
import Results from './components/results'
import Hero from './components/hero'
import CloudsShapeDivider from './styles/react/shape_divider/clouds'
import WaveShapeDivider from './styles/react/shape_divider/wave'

class App extends React.Component {
  render() {
    const jobId = (window.location.search).substring(3)

    return (
      <div>
        <Hero />
        <WaveShapeDivider bottomColor="#d13c6b" topColor="#fff" />
        { !jobId ? <Form /> : <Results jobId={ jobId } /> }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
