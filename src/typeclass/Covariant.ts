/**
 * @since 1.0.0
 */
import { dual } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Covariant<F extends TypeLambda> extends Invariant<F> {
  readonly map: {
    <A, B>(f: (a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
    <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B): Kind<F, R, O, E, B>
  }
}

/**
 * Returns a default `map` composition.
 *
 * @since 1.0.0
 */
export const mapComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Covariant<F>,
  G: Covariant<G>
): (<A, B>(
  f: (a: A) => B
) => <FR, FO, FE, GR, GO, GE>(
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>) => f => F.map(G.map(f))

/**
 * Returns a default `imap` implementation.
 *
 * @since 1.0.0
 */
export const imap = <F extends TypeLambda>(
  map: <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B) => Kind<F, R, O, E, B>
): Invariant<F>["imap"] => dual(3, (self, to, _) => map(self, to))

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap = <F extends TypeLambda>(F: Covariant<F>): {
  <R, O, E, A, B>(self: Kind<F, R, O, E, (a: A) => B>): (a: A) => Kind<F, R, O, E, B>
  <A, R, O, E, B>(a: A, self: Kind<F, R, O, E, (a: A) => B>): Kind<F, R, O, E, B>
} =>
  dual(
    2,
    <A, R, O, E, B>(a: A, self: Kind<F, R, O, E, (a: A) => B>): Kind<F, R, O, E, B> =>
      F.map(self, f => f(a))
  )

/**
 * @category mapping
 * @since 1.0.0
 */
export const as = <F extends TypeLambda>(F: Covariant<F>): {
  <B>(b: B): <R, O, E, _>(self: Kind<F, R, O, E, _>) => Kind<F, R, O, E, B>
  <R, O, E, _, B>(self: Kind<F, R, O, E, _>, b: B): Kind<F, R, O, E, B>
} =>
  dual(
    2,
    <R, O, E, _, B>(self: Kind<F, R, O, E, _>, b: B): Kind<F, R, O, E, B> => F.map(self, () => b)
  )

/**
 * @category mapping
 * @since 1.0.0
 */
export const asUnit = <F extends TypeLambda>(
  F: Covariant<F>
): (<R, O, E, _>(self: Kind<F, R, O, E, _>) => Kind<F, R, O, E, void>) => as(F)<void>(undefined)

const let_ = <F extends TypeLambda>(
  F: Covariant<F>
): {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): <R, O, E>(
    self: Kind<F, R, O, E, A>
  ) => Kind<F, R, O, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
  <R, O, E, A extends object, N extends string, B>(
    self: Kind<F, R, O, E, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): Kind<F, R, O, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
} =>
  dual(3, <R, O, E, A extends object, N extends string, B>(
    self: Kind<F, R, O, E, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): Kind<F, R, O, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> =>
    F.map(self, a => Object.assign({}, a, { [name]: f(a) }) as any))

export {
  /**
   * @category do notation
   * @since 1.0.0
   */
  let_ as let
}
