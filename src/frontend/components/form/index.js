import React from 'react'

import '~/styles/components/form.scss'

export default class Form extends React.Component {
  render() {
    return (
      <div className="component__form">
        <div className="container">
          <h2>Start Scraping</h2>
          <div className="links">
            <a className="btn btn-accent" href="#">Start with Extension</a>
            <a className="btn" href="#">Manual Input</a>
          </div>
        </div>
      </div>
    )
  }
}