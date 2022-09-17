/**
 * `Compactable` represents data structures which can be _compacted_/_separated_.
 *
 * @since 3.0.0
 */
import type { Either } from './Either'
import { constVoid, flow, pipe } from './function'
import * as FunctorModule from './Functor'
import type { HKT, Kind, Typeclass } from './HKT'
import * as OptionModule from './Option'
import * as SeparatedModule from './Separated'
import * as _ from './internal'

import Option = OptionModule.Option
import Separated = SeparatedModule.Separated

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Compactable<F extends HKT> extends Typeclass<F> {
  readonly compact: <S, R, W, E, A>(foa: Kind<F, S, R, W, E, Option<A>>) => Kind<F, S, R, W, E, A>
  readonly separate: <S, R, W, E, A, B>(
    fe: Kind<F, S, R, W, E, Either<A, B>>
  ) => Separated<Kind<F, S, R, W, E, A>, Kind<F, S, R, W, E, B>>
}

// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------

/**
 * Return a default `compact` implementation from `Functor` and `separate`.
 *
 * @category defaults
 * @since 3.0.0
 */
export const compactDefault = <F extends HKT>(F: FunctorModule.Functor<F>) => (
  separate: Compactable<F>['separate']
): Compactable<F>['compact'] => {
  return flow(F.map(_.fromOption(constVoid)), separate, SeparatedModule.right)
}

/**
 * Return a default `separate` implementation from `Functor` and `compact`.
 *
 * @category defaults
 * @since 3.0.0
 */
export function separateDefault<F extends HKT>(
  F: FunctorModule.Functor<F>
): (compact: Compactable<F>['compact']) => Compactable<F>['separate'] {
  return (compact) => (fe) =>
    SeparatedModule.separated(
      pipe(fe, F.map(OptionModule.getLeft), compact),
      pipe(fe, F.map(OptionModule.getRight), compact)
    )
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `compact` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function compact<F extends HKT, G extends HKT>(
  F: FunctorModule.Functor<F>,
  G: Compactable<G>
): <FS, FR, FW, FE, GS, GR, GW, GE, A>(
  fgoa: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, Option<A>>>
) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>> {
  return F.map(G.compact)
}

/**
 * `separate` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function separate<F extends HKT, G extends HKT>(
  F: FunctorModule.Functor<F>,
  C: Compactable<G>,
  G: FunctorModule.Functor<G>
): <FS, FR, FW, FE, GS, GR, GW, GE, A, B>(
  fge: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, Either<A, B>>>
) => Separated<
  Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>,
  Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>
> {
  const compactFC = compact(F, C)
  const mapFG = FunctorModule.map(F, G)
  return (fge) =>
    SeparatedModule.separated(
      pipe(fge, mapFG(OptionModule.getLeft), compactFC),
      pipe(fge, mapFG(OptionModule.getRight), compactFC)
    )
}
