import React from 'react'
import Icon from 'react-oui-icons'

import SectionBody from '../section_body'
import SectionHeader from '../section_header'

export default class UrlPattern extends React.Component {
  render() {
    return (
      <div className="component__form_section">
        <SectionHeader title="Step 3"
                       subtitle="Choose your URL pattern"
                       icon="link" />
        <SectionBody>
          <button className="btn">Add Additional Parameter</button>
        </SectionBody>
      </div>
    )
  }
}