import React from 'react'
import Icon from 'react-oui-icons'

const SectionHelp = ({ icon, copy }) => {
  return (
    <div className="section-tips">
      <hr />
      <div className="wrapper">
        <div className="tip-icon">
          <Icon name={ icon } description={ icon } fill="black" size="large" />
        </div>
        <em>{ copy }</em>
      </div>
    </div>
  )
}

export default SectionHelp