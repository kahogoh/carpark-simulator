import { observable, transaction } from 'mobx'
import Config from '../Config'


const maxX = Config.ROW
const maxY = Config.COL

class CarparkStore {
  bus = observable({
    x: -1,
    y: -1,
    face: 0,
  })
  actions = observable([])

  isValidBus = () => this.bus.x >= 0 && this.bus.y >= 0

  resetBus = () => {
    transaction(() => {
      this.bus.x = -1
      this.bus.y = -1
    })
  }

  place = (x, y, face) => {
    transaction(() => {
      this.bus.x = x
      this.bus.y = y
      this.bus.face = face
      this.actions.replace([`PLACE ${x}, ${y}, ${Config.FACE[face]}`])
    })
  }

  move = (step = 1) => {
    if (!this.isValidBus()) {
      return
    }

    transaction(() => {
      if (this.bus.face === 0) { // North
        let newX = this.bus.x + step
        if (newX >= maxX) {
          newX = maxX - 1
        }
        this.bus.x = newX
      } else if (this.bus.face === 1) { // East
        let newY = this.bus.y + step
        if (newY >= maxY) {
          newY = maxY - 1
        }
        this.bus.y = newY
      } else if (this.bus.face === 2) { // South
        let newX = this.bus.x - step
        if (newX < 0) {
          newX = 0
        }
        this.bus.x = newX
      } else if (this.bus.face === 3) { // West
        let newY = this.bus.y - step
        if (newY < 0) {
          newY = 0
        }
        this.bus.y = newY
      }
      this.actions.push('MOVE')
    })
  }

  left = () => {
    if (!this.isValidBus()) {
      return
    }

    let newFace = this.bus.face - 1
    if (newFace < 0) {
      newFace = 3
    }
    transaction(() => {
      this.bus.face = newFace
      this.actions.push('LEFT')
    })
  }

  right = () => {
    if (!this.isValidBus()) {
      return
    }

    let newFace = this.bus.face + 1
    if (newFace > 3) {
      newFace = 0
    }
    transaction(() => {
      this.bus.face = newFace
      this.actions.push('RIGHT')
    })
  }

  report = () => {
    if (!this.isValidBus()) {
      return
    }

    const { x, y, face } = this.bus
    const report = `${x}, ${y}, ${Config.FACE[face]}`

    this.actions.push(report)
    this.resetBus()
  }
}

export default new CarparkStore()
