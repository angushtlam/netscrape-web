import React from 'react'

import '~/styles/components/form.scss'

import SchemaDefinition from './schema_definition'
import SelectElements from './select_elements'
import UrlPattern from './url_pattern'

export default class Form extends React.Component {
  constructor() {
    super()

    this.state = {
      elementsToScrape: [],
      dataSchema: [],
      urlPattern: '',
    }

    this.setElementsToScrape = this.setElementsToScrape.bind(this)
    this.setSchemaDefinition = this.setSchemaDefinition.bind(this)
    this.setUrlPattern = this.setUrlPattern.bind(this)
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
            <button className="btn btn-accent">Begin Scraping Job</button>
            <button className="btn">Reset</button>
          </div>
          <hr />
        </div>
      </div>
    )
  }
}