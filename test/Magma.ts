import { increment, pipe } from '../src/Function'
import * as _ from '../src/Magma'
import * as number from '../src/number'
import * as U from './util'

const MagmaSub: _.Magma<number> = {
  combine: number.sub
}

describe('Magma', () => {
  it('reverse', () => {
    const subAll = _.combineAll(_.reverse(MagmaSub))(0)
    U.deepStrictEqual(subAll([1, 2, 3]), 2)
  })

  it('filterFirst', () => {
    const M = pipe(
      number.SemigroupSum,
      _.filterFirst((n) => n >= 0)
    )
    // sum ignoring negative partials
    const sum = _.combineAll(M)(0)
    U.deepStrictEqual(sum([1, -2, 3]), 3)
  })

  it('filterSecond', () => {
    const M = pipe(
      number.SemigroupSum,
      _.filterSecond((n) => n >= 0)
    )
    // sum ignoring negative elements
    const sum = _.combineAll(M)(0)
    U.deepStrictEqual(sum([1, -2, 3]), 4)
  })

  it('endo', () => {
    const M = pipe(number.SemigroupSum, _.endo(increment))
    const sum = _.combineAll(M)(0)
    U.deepStrictEqual(sum([1, -2, 3]), 8)
  })

  describe('combineAll', () => {
    const combineAll = _.combineAll(MagmaSub)(0)

    it('baseline', () => {
      U.deepStrictEqual(combineAll([1, 2, 3]), -6)
    })

    it('should accept an Iterable', () => {
      U.deepStrictEqual(combineAll(new Set([1, 2, 3])), -6)
    })
  })
})
