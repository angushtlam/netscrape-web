import React from 'react'
import Icon from 'react-oui-icons'

import SectionBody from '../section_body'
import SectionHeader from '../section_header'
import SectionTips from '../section_tips'

export default class SchemaDefinition extends React.Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(i) {
    return (event) => {
      const { elementsToScrape, } = this.props
      const elems = elementsToScrape.slice(0)
      elems[i] = event.target.value
      this.props.setter(elems)
    }
  }

  render() {
    const { dataSchema, elementsToScrape, } = this.props
    const schemaList = elementsToScrape.map((item, i) => (
      <div className="schema-entry" key={ i }>
        <input className="schema-key"
               type="text"
               value={ dataSchema[i] } 
               onChange={ this.handleChange(i) } />
        <span className="schema-element">: { item }</span>
      </div>
    ))

    return (
      <div className="component__form_section">
        <SectionHeader title="Step 2"
                       subtitle="Define your schema"
                       icon="projects" />
        <SectionBody>
          <div className="component__schema_definition">
          {
            schemaList && schemaList.length > 0 ?
            (
              <div className="schema">
                &#123;
                <div className="schema-entries">
                  { schemaList }
                </div>
                &#125;
              </div>
            ) :
            (<em>No data points selected.</em>)
          }
          </div>
          <SectionTips icon="help" 
                       copy="This is where you choose the way you'd like to format your response data. After your scrape job is complete, you will receieve a JSON list of data entries formatted in this schema." />
        </SectionBody>
      </div>
    )
  }
}