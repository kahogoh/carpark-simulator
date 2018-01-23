import React, { Component } from 'react'
import PropTypes from 'prop-types'
import bus from '../images/bus.png'
import '../styles/carpark.css'

const faceStyleNames = ['north', 'east', 'south', 'west']
export default class CarparkUnit extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    face: PropTypes.number,
  }

  static defaultProps = {
    face: undefined,
  }

  handlePress = (face) => {
    this.props.onPress(face)
  }

  render() {
    // Content will be render based on bus face is provided
    let content
    if (this.props.face !== undefined) {
      // Show content of bus
      const className = `carpark-bus ${faceStyleNames[this.props.face]}`
      content = (
        <div className={className}>
          <img src={bus} className="image-bus" alt="bus" />
        </div>
      )
    } else {
      // Show selection for Place
      content = Array(4).fill().map((_, key) => {
        const onClick = () => this.handlePress(key)
        const props = {
          key,
          className: `carpark-face ${faceStyleNames[key]}`,
          onClick,
        }
        return <div {...props} />
      })
    }

    return (
      <div className="carpark-unit">
        <div className="carpark-unit-name">
          { this.props.name }
        </div>
        { content }
      </div>
    )
  }
}
