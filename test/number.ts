import * as U from './util'
import { pipe } from '../src/Function'
import * as _ from '../src/number'

describe('number', () => {
  it('sumAll', () => {
    U.deepStrictEqual(_.sumAll([1, 2, 3]), 6)
  })

  it('productAll', () => {
    U.deepStrictEqual(_.productAll([2, 3, 4]), 24)
  })

  it('Ord', () => {
    U.deepStrictEqual(pipe(1, _.Ord.compare(2)), -1)
    U.deepStrictEqual(pipe(2, _.Ord.compare(1)), 1)
    U.deepStrictEqual(pipe(2, _.Ord.compare(2)), 0)
  })

  it('Show', () => {
    U.deepStrictEqual(_.Show.show(1), '1')
  })

  it('SemigroupProduct', () => {
    U.deepStrictEqual(pipe(2, _.SemigroupProduct.combine(3)), 6)
  })

  it('MagmaSub', () => {
    U.deepStrictEqual(pipe(2, _.MagmaSub.combine(3)), -1)
  })
})
