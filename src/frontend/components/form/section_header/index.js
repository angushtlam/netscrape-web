import React from 'react'
import Icon from 'react-oui-icons'

const SectionHeader = ({ title, subtitle, icon, }) => {
  return (
    <div className="section-header">
      <div className="icon">
        <Icon name={ icon } description={ icon } fill="white" style={
          {
            height: '64px',
            width: '64px',
          }
        } />
      </div>
      <div className="title">
        <h3>{ title }</h3>
        <h5>{ subtitle }</h5>
      </div>
  </div>
  )
}

export default SectionHeader