import { observable, transaction } from 'mobx'
import Config from '../Config'


const maxX = Config.COL
const maxY = Config.ROW

class CarparkStore {
  bus = observable({
    x: -1,
    y: -1,
    face: 0,
  })
  actions = observable([])

  isValidBus = (target = this.bus) => target.x >= 0
    && target.y >= 0
    && target.x < maxX
    && target.y < maxY

  resetBus = () => {
    transaction(() => {
      this.bus.x = -1
      this.bus.y = -1
    })
  }

  place = (x, y, face) => {
    if (!this.isValidBus({ x, y })) {
      this.actions.replace([])
      return
    }

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
        let newY = this.bus.y + step
        if (newY >= maxY) {
          newY = maxY - 1
        }
        this.bus.y = newY
      } else if (this.bus.face === 1) { // East
        let newX = this.bus.x + step
        if (newX >= maxX) {
          newX = maxX - 1
        }
        this.bus.x = newX
      } else if (this.bus.face === 2) { // South
        let newY = this.bus.y - step
        if (newY < 0) {
          newY = 0
        }
        this.bus.y = newY
      } else if (this.bus.face === 3) { // West
        let newX = this.bus.x - step
        if (newX < 0) {
          newX = 0
        }
        this.bus.x = newX
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
