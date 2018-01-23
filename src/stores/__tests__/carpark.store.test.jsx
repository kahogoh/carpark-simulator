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
