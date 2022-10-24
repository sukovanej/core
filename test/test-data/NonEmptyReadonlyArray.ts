import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import * as nonEmptyReadonlyArray from "@fp-ts/core/internal/NonEmptyReadonlyArray"
import type { NonEmptyApplicative } from "@fp-ts/core/typeclass/NonEmptyApplicative"
import type * as nonEmptyTraversable from "@fp-ts/core/typeclass/NonEmptyTraversable"

/**
 * @category models
 * @since 1.0.0
 */
export type NonEmptyReadonlyArray<A> = readonly [A, ...ReadonlyArray<A>]

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface NonEmptyReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: NonEmptyReadonlyArray<this["Target"]>
}

export const isNonEmpty = nonEmptyReadonlyArray.isNonEmpty
export const head = nonEmptyReadonlyArray.head
export const tail = nonEmptyReadonlyArray.tail

export const mapWithIndex = <A, B>(
  f: (a: A, i: number) => B
) =>
  (self: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<B> => {
    const out: [B, ...Array<B>] = [f(head(self), 0)]
    for (let i = 1; i < self.length; i++) {
      out.push(f(self[i], i))
    }
    return out
  }

export const traverseWithIndex = <F extends TypeLambda>(
  NonEmptyApplicative: NonEmptyApplicative<F>
) =>
  <A, R, O, E, B>(f: (a: A, i: number) => Kind<F, R, O, E, B>) =>
    (self: NonEmptyReadonlyArray<A>): Kind<F, R, O, E, NonEmptyReadonlyArray<B>> => {
      const fbs = pipe(self, mapWithIndex(f))
      return pipe(
        head(fbs),
        NonEmptyApplicative.productMany(tail(fbs))
      )
    }

export const nonEmptyTraverse = <F extends TypeLambda>(
  NonEmptyApplicative: NonEmptyApplicative<F>
) =>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): ((self: NonEmptyReadonlyArray<A>) => Kind<F, R, O, E, NonEmptyReadonlyArray<B>>) =>
    traverseWithIndex(NonEmptyApplicative)(f)

export const NonEmptyTraversable: nonEmptyTraversable.NonEmptyTraversable<
  NonEmptyReadonlyArrayTypeLambda
> = {
  nonEmptyTraverse
}
