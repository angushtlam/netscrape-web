import React from 'react'
import Icon from 'react-oui-icons'

import SectionBody from '../section_body'
import SectionHeader from '../section_header'
import SectionTips from '../section_tips'

export default class UrlPattern extends React.Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.setter(event.target.value)
  }

  render() {
    const { urlPattern, } = this.props

    return (
      <div className="component__form_section">
        <SectionHeader title="Step 3"
                       subtitle="Enter your URL pattern"
                       icon="link" />
        <SectionBody>
          <div className="component__url_pattern">
            <input placeholder="http://google.com/search?q=hackathon&start=(0 100 10)" type="text" value={ urlPattern } onChange={ this.handleChange } />
          </div>
          
          <SectionTips icon="help" 
            copy="This is where you define the set of websites you want to scrape. You can use Netscrape's URL pattern syntax to scrape multiple pages." />
        </SectionBody>
      </div>
    )
  }
}