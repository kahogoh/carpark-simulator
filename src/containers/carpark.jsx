import React, { Component } from 'react'
import { observer } from 'mobx-react'
import CarparkUnit from '../components/carpark.unit'
import CarparkStore from '../stores/carpark.store'
import Config from '../Config'
import '../styles/carpark.css'

class Carpark extends Component {
  handlePress = (row, col, face) => {
    CarparkStore.place(row, col, face)
  }

  render() {
    return (
      <div className="carpark-container">
        {
          // Generate Carpark Row
          Array(Config.ROW).fill().map((_x, _row) => {
            const row = Config.ROW - _row - 1
            return (
              <div key={`row${row}`} className="carpark-row">
                {
                  // Generate Carpark Column of the Row
                  Array(Config.COL).fill().map((_y, col) => {
                    // get bus face if it is same location
                    let busFace
                    if (CarparkStore.bus.x === row && CarparkStore.bus.y === col) {
                      busFace = CarparkStore.bus.face
                    }
                    // Carpark Unit onPress
                    const onPress = (face) => {
                      this.handlePress(row, col, face)
                    }
                    const props = {
                      key: `${row}col${col}`,
                      name: `${row}, ${col}`,
                      face: busFace,
                      onPress,
                    }
                    return <CarparkUnit {...props} />
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default observer(Carpark)
