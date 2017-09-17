import React from 'react'

import '~/styles/components/form.scss'

import SchemaDefinition from './schema_definition'
import SelectElements from './select_elements'
import UrlPattern from './url_pattern'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      elementsToScrape: props.extensionInput ? props.extensionInput : [],
      dataSchema: [],
      urlPattern: '',
    }

    this.setElementsToScrape = this.setElementsToScrape.bind(this)
    this.setSchemaDefinition = this.setSchemaDefinition.bind(this)
    this.setUrlPattern = this.setUrlPattern.bind(this)
    this.canStartJob = this.canStartJob.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  setElementsToScrape(elements) {
    this.setState({ elementsToScrape: elements, })
  }

  setSchemaDefinition(schema) {
    this.setState({ dataSchema: schema, })
  }

  setUrlPattern(pattern) {
    this.setState({ urlPattern: pattern, })
  }

  canStartJob() {
    const { elementsToScrape, dataSchema, urlPattern, } = this.state
    if (urlPattern === '') return false
    if (elementsToScrape === []) return false
    return true
  }

  submitForm() {
    const { elementsToScrape, dataSchema, urlPattern, } = this.state

    const schema = {}
    for (let i = 0; i < dataSchema.length; i++) {
      schema[dataSchema[i]] = elementsToScrape[i]
    }

    fetch('/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'url_pattern': urlPattern,
        'schema': schema,
      })
    }).then((response) => {
      return response.json()
    }, (error) => {
      console.log(error.message)
      this.resetForm()
    }).then(json => {
      console.log(json)
      this.resetForm()
      window.location.href = '/?q=' + json.id
    })
  }

  resetForm() {
    this.setState({
      elementsToScrape: [],
      dataSchema: [],
      urlPattern: '',
    })
  }

  render() {
    return (
      <div className="component__form" id="form">
        <div className="container">
          <h2>Start Scraping</h2>
          <div className="call-to-action">
            <a className="btn btn-accent" href="#">Start with Extension</a>
            <a className="btn" href="#form">Manual Input</a>
          </div>
          <hr />
          <SelectElements elementsToScrape={ this.state.elementsToScrape }
                          setter={ this.setElementsToScrape } />
          <SchemaDefinition elementsToScrape={ this.state.elementsToScrape }
                            dataSchema={ this.state.dataSchema }
                            setter={ this.setSchemaDefinition } />
          <UrlPattern urlPattern={ this.state.urlPattern }
                      setter={ this.setUrlPattern } />
          <div className="form-submit">
            <button className="btn btn-accent"
                    onClick={ this.submitForm }
                    disabled={ !this.canStartJob() }>
                    Begin Scraping Job
            </button>
            <button className="btn" onClick={ this.resetForm }>
              Reset
            </button>
          </div>
          <hr />
        </div>
      </div>
    )
  }
}