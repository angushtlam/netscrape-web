import React from 'react'
import Icon from 'react-oui-icons'

import '~/styles/components/results.scss'

export default class Results extends React.Component {
  constructor(props) {
    super()

    this.state = {
      completed: false,
      results: null,
    }

    fetch('/scrape/' + props.jobId, {
      method: 'GET',
    }).then((response) => {
      return response.json()
    }, (error) => {
      console.log(error.message)
      this.resetForm()
    }).then(json => {
      console.log(json)
      this.setState({
        completed: json.completed,
        results: json.result || null,
      })
    })

    const interval = setInterval(() => {
      fetch('/scrape/' + props.jobId, {
        method: 'GET',
      }).then((response) => {
        return response.json()
      }, (error) => {
        console.log(error.message)
        this.resetForm()
      }).then(json => {
        console.log(json)
        this.setState({
          completed: json.completed,
          results: json.result || null,
        })

        if (json.completed) {
          clearInterval(interval)
        }
      })
    }, 1000)
  }

  render() {
    const { completed, results, } = this.state
    console.log(results)
    return (
      <div className="component__results">
        <div className="container">
          <h2>Results</h2>
          <span className="result-job-id">for Job ID { this.props.jobId }</span>
          {
            completed ? 
            <Icon name="check" description="check" fill="white" size="large" /> :
            <Icon name="refresh" description="loading" fill="white" size="large" />
          }
          <hr />
          { completed ? (
            <div>
              <div className="results-blob">{ results }</div>
              <hr />
              <a className="btn" href="/">Start New Scrape</a>
            </div>
          ) : (
            <em>Job is still running...</em>
          )}
          
        </div>
      </div>
    )
  }
}