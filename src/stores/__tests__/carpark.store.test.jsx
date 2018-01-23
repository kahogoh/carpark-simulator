import assert from 'assert'
import CarparkStore from '../carpark.store'

it('Test case a)', () => {
  CarparkStore.place(0, 0, 0)
  CarparkStore.move()
  CarparkStore.report()
  const result = CarparkStore.actions[CarparkStore.actions.length - 1]

  assert.equal(result, '0, 1, North')
})

it('Test case b)', () => {
  CarparkStore.place(0, 0, 0)
  CarparkStore.left()
  CarparkStore.report()
  const result = CarparkStore.actions[CarparkStore.actions.length - 1]

  assert.equal(result, '0, 0, West')
})

it('Test case c)', () => {
  CarparkStore.place(1, 2, 1)
  CarparkStore.move()
  CarparkStore.move()
  CarparkStore.left()
  CarparkStore.move()
  CarparkStore.report()
  const result = CarparkStore.actions[CarparkStore.actions.length - 1]

  assert.equal(result, '3, 3, North')
})

it('Requirement: Bus initial placement must be within carpark)', () => {
  // No Bus has been placed, actions list should be clear
  CarparkStore.place(10, 10, 2)
  CarparkStore.report()
  const result = CarparkStore.actions.length
  assert.equal(result, 0)
})

it('Requirement: Bus movement must be within carpark)', () => {
  // South West can't move south/west anymore
  CarparkStore.place(0, 0, 2)
  CarparkStore.move()
  CarparkStore.right()
  CarparkStore.move()
  CarparkStore.report()
  let result = CarparkStore.actions[CarparkStore.actions.length - 1]

  assert.equal(result, '0, 0, West')

  // North East can't move north/east anymore
  CarparkStore.place(4, 4, 1)
  CarparkStore.move()
  CarparkStore.left()
  CarparkStore.move()
  CarparkStore.report()
  result = CarparkStore.actions[CarparkStore.actions.length - 1]

  assert.equal(result, '4, 4, North')
})
