import { pipe } from "@fp-ts/core/Function"
import * as P from "@fp-ts/core/Predicate"
import * as S from "@fp-ts/core/String"
import * as _ from "@fp-ts/core/typeclass/Contravariant"
import * as order from "@fp-ts/core/typeclass/Order"
import * as U from "../util"

describe("Contravariant", () => {
  it("mapComposition", () => {
    const map = _.contramapComposition(P.Contravariant, P.Contravariant)
    const emptyString: P.Predicate<P.Predicate<string>> = p => p("") === true
    const a = pipe(emptyString, map(s => s.length))
    U.deepStrictEqual(a(S.isString), false)
    U.deepStrictEqual(a(n => n === 0), true)
  })

  it("imap", () => {
    const O = _.imap<order.OrderTypeLambda>(order.contramap)(
      (s: string) => [s],
      ([s]) => s
    )(
      S.Order
    )
    U.deepStrictEqual(pipe(["a"], O.compare(["b"])), -1)
    U.deepStrictEqual(pipe(["a"], O.compare(["a"])), 0)
    U.deepStrictEqual(pipe(["b"], O.compare(["a"])), 1)
  })
})
