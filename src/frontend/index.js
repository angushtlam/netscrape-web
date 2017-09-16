import React from 'react'
import ReactDOM from 'react-dom'

import Form from './form'

const styles = {
  backgroundColor: '#1c858e',
}

class App extends React.Component {
  render() {
    return (
      <div style={styles}>
        <Form />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
