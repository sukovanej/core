import { pipe } from "@fp-ts/core/Function"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as _ from "@fp-ts/core/test/limbo/CovariantWithIndex"
import * as U from "../util"

const CovariantWithIndex: _.CovariantWithIndex<RA.ReadonlyArrayTypeLambda, number> = {
  mapWithIndex: RA.mapWithIndex
}

describe("CovariantWithIndex", () => {
  it("mapWithIndexComposition", () => {
    const mapWithIndex = _.mapWithIndexComposition(CovariantWithIndex, CovariantWithIndex)
    const f = (a: string, [i, j]: readonly [number, number]) => a + i + j
    U.deepStrictEqual(pipe([], mapWithIndex(f)), [])
    U.deepStrictEqual(pipe([[]], mapWithIndex(f)), [[]])
    U.deepStrictEqual(pipe([["a"]], mapWithIndex(f)), [["a00"]])
    U.deepStrictEqual(pipe([["a"], ["b"]], mapWithIndex(f)), [["a00"], ["b10"]])
    U.deepStrictEqual(pipe([["a", "c"], ["b", "d", "e"]], mapWithIndex(f)), [["a00", "c01"], [
      "b10",
      "d11",
      "e12"
    ]])
  })

  // it("map", () => {
  //   const map = _.map(CovariantWithIndex)
  //   const f = (a: string) => a + "!"
  //   U.deepStrictEqual(pipe([], map(f)), [])
  //   U.deepStrictEqual(pipe(["a", "b", "c"], map(f)), ["a!", "b!", "c!"])
  // })
})
