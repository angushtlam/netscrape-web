import React from 'react'
import ReactDOM from 'react-dom'

import './styles/base.scss'

import Form from './form'

class App extends React.Component {
  render() {
    return (
      <div>
        <Form />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
