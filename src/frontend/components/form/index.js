import React from 'react'

import '~/styles/components/form.scss'

import SchemaDefinition from './schema_definition'
import SelectElements from './select_elements'
import UrlPattern from './url_pattern'

export default class Form extends React.Component {
  constructor() {
    super()

    this.state = {
      elementsToScrape: []
    }
  }

  render() {
    return (
      <div className="component__form">
        <div className="container">
          <h2>Start Scraping</h2>
          <div className="call-to-action">
            <a className="btn btn-accent" href="#">Start with Extension</a>
            <a className="btn" href="#">Manual Input</a>
          </div>
          <hr />
          <SelectElements />
          <SchemaDefinition />
          <UrlPattern />
          <div className="form-submit">
            <button className="btn">Reset</button>
            <button className="btn btn-accent">Start Scraping Job</button>
          </div>
          <hr />
        </div>
      </div>
    )
  }
}