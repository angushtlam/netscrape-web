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

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
class App extends React.Component {
  render() {
    const jobId = getParameterByName('q')
    const extensionData = getParameterByName('ext')
    let extensionInput = null
    if (extensionData) {
      extensionInput = extensionData.split('!')
    }

    return (
      <div>
        <Hero />
        <WaveShapeDivider bottomColor="#d13c6b" topColor="#fff" />
        {
          extensionInput ? <Form extensionInput={ extensionInput } /> :
          (
            jobId ? <Results jobId={ jobId } /> : <Form />
          )
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
