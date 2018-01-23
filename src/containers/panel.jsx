import React, { Component } from 'react'
import { observer } from 'mobx-react'
import CarparkStore from '../stores/carpark.store'
import '../styles/panel.css'

class Panel extends Component {
  handleLeft = () => {
    CarparkStore.left()
  }

  handleRight = () => {
    CarparkStore.right()
  }

  handleMove = () => {
    CarparkStore.move()
  }

  handleReport = () => {
    CarparkStore.report()
  }

  render() {
    return (
      <div className="panel-container">
        <div className="panel-instruction">
          <b>Instructions:</b><br />
          <p>
            Select which <span className="span-unit">Unit</span> to place the bus in one of the direction.<br />
          Use <span className="span-panel">Panel</span> below to control the bus.
          </p>
        </div>
        <div className="panel-buttons">
          {
            ['Move', 'Left', 'Right', 'Report'].map((key) => {
              const onClick = this[`handle${key}`]
              const props = {
                key,
                className: `panel-btn-wrapper ${key.toLowerCase()}`,
                onClick,
              }
              return (
                <div {...props}>
                  <div className="panel-btn">
                    { key }
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className="panel-actions">
          { CarparkStore.actions.join('\n') }
        </div>
      </div>
    )
  }
}

export default observer(Panel)
