import React from 'react'

import '~/styles/components/hero.scss'

import Particles from 'react-particles-js';

export default class Hero extends React.Component {
  render() {
    const particlesParam = {
      particles: {
        number: {
          value: 15,
          density: {
            enable: true,
            value_area: 600,
          },
        },
        line_linked: {
          shadow: {
            enable: true,
            color: "#49BCB1",
            blur: 5,
          }
        },
        retina_detect: true,
      },
    }

    const particleStyles = {
      position: 'absolute',
      top: '0',
      minHeight: '500px',
    }

    return (
      <div className="component__hero">
        <div className="wrapper">
          <div className="content">
            <Particles style={ particleStyles } params={ particlesParam } height="70vh"/>
            <div className="container">
              <h1>Netscrape</h1>
              <h5>HTML Web Scraping. Simplified.</h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}