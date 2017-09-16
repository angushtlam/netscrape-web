import React from 'react'
import Icon from 'react-oui-icons'

import SectionBody from '../section_body'
import SectionHeader from '../section_header'

export default class SelectElement extends React.Component {
  render() {
    return (
      <div className="component__form_section">
        <SectionHeader title="Step 1"
                       subtitle="Select your data"
                       icon="dimensions" />
        <SectionBody>
          <button className="btn btn-accent">Add a new Data Point</button>
        </SectionBody>
      </div>
    )
  }
}