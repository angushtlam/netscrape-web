import React from 'react'
import Icon from 'react-oui-icons'

import SectionBody from '../section_body'
import SectionHeader from '../section_header'
import SectionTips from '../section_tips'

export default class SelectElement extends React.Component {
  constructor() {
    super()

    this.addNewDataPoint = this.addNewDataPoint.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  addNewDataPoint() {
    const { elementsToScrape, } = this.props
    const elems = elementsToScrape.slice(0)
    elems.push('')
    this.props.setter(elems)
  }

  handleChange(i) {
    return (event) => {
      const { elementsToScrape, } = this.props
      const elems = elementsToScrape.slice(0)
      elems[i] = event.target.value
      this.props.setter(elems)
    }
  }

  deleteDataPoint(i) {
    return (event) => {
      const { elementsToScrape, } = this.props
      const elems = elementsToScrape.slice(0)
      elems.splice(i, 1);
      this.props.setter(elems)
    }
  }

  render() {
    return (
      <div className="component__form_section">
        <SectionHeader title="Step 1"
                       subtitle="Select your data"
                       icon="dimensions" />
        <SectionBody>
          <div className="component__select_elements">
            <button className="btn btn-accent" onClick={ this.addNewDataPoint }>
              Add new Data Point
            </button>
            <div className="data-points">
            {
              this.props.elementsToScrape.map((item, i) => (
                <div className="data-point" key={ i }>
                  <input type="text"
                         value={ item }
                         onChange={ this.handleChange(i) } />
                  <div className="delete-data-point" onClick={ this.deleteDataPoint(i) }>
                    <Icon name="close" description="close" fill="black" size="large" />
                  </div>
                </div>
              ))
            }
            </div>
          </div>
          <SectionTips icon="help" 
                       copy="Identify the class names of the elements on a webpage you would like to scrape data from. These elements form the data points of your scrape job. We highly recommend using the Chrome Extension!" />
        </SectionBody>
      </div>
    )
  }
}