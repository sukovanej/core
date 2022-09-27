/**
 * `IOOption<A>` represents a synchronous computation that either yields a value of type `A` or nothing.
 *
 * If you want to represent a synchronous computation that never fails, please see `IO`.
 * If you want to represent a synchronous computation that may fail, please see `IOEither`.
 *
 * @since 3.0.0
 */
import type * as semigroupK from './SemigroupK'
import * as monoidK from './MonoidK'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as flattenable from './Flattenable'
import * as compactable from './Compactable'
import type { Either } from './Either'
import * as filterable from './Filterable'
import * as fromOption_ from './FromOption'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import type { LazyArg } from './function'
import { flow, identity, SK } from './function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import * as io from './IO'
import type { IOEither } from './IOEither'
import type * as monad from './Monad'
import * as option from './Option'
import * as optionT from './OptionT'
import type * as pointed from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { IO } from './IO'
import type { Option } from './Option'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface IOOption<A> extends IO<Option<A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const some: <A>(a: A) => IOOption<A> = /*#__PURE__*/ optionT.some(io.Pointed)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <A>(fa: Option<A>) => IOOption<A> = io.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <A>(e: Either<unknown, A>) => IO<option.Option<A>> = /*#__PURE__*/ optionT.fromEither(
  io.Pointed
)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A>(ma: IO<A>) => IOOption<A> = /*#__PURE__*/ optionT.fromF(io.Functor)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <A>(ma: IOEither<unknown, A>) => IOOption<A> = /*#__PURE__*/ io.map(option.fromEither)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) => (ma: IOOption<A>) => IO<B | C> =
  /*#__PURE__*/ optionT.match(io.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchWithEffect: <B, A, C = B>(
  onNone: LazyArg<IO<B>>,
  onSome: (a: A) => IO<C>
) => (ma: IOOption<A>) => IO<B | C> = /*#__PURE__*/ optionT.matchWithEffect(io.Flattenable)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <B>(onNone: LazyArg<B>) => <A>(ma: IOOption<A>) => IO<A | B> = /*#__PURE__*/ optionT.getOrElse(
  io.Functor
)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseWithEffect: <B>(onNone: LazyArg<IO<B>>) => <A>(ma: IOOption<A>) => IO<A | B> =
  /*#__PURE__*/ optionT.getOrElseWithEffect(io.Monad)

/**
 * @category destructors
 * @since 3.0.0
 */
export const toUndefined: <A>(ma: IOOption<A>) => IO<A | undefined> = io.map(option.toUndefined)

/**
 * @category destructors
 * @since 3.0.0
 */
export const toNullable: <A>(ma: IOOption<A>) => IO<A | null> = io.map(option.toNullable)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: IOOption<A>) => IOOption<B> = /*#__PURE__*/ optionT.map(io.Functor)

/**
 * @category Apply
 * @since 3.0.0
 */
export const ap: <A>(fa: IOOption<A>) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B> = /*#__PURE__*/ optionT.ap(
  io.Apply
)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => IOOption<A> = some

/**
 * @since 3.0.0
 */
export const unit: IOOption<void> = of(undefined)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Flattenable
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ optionT.flatMap(io.Monad)

/**
 * Derivable from `Flattenable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: IOOption<IOOption<A>>) => IOOption<A> = /*#__PURE__*/ flatMap(identity)

/**
 * @category SemigroupK
 * @since 3.0.0
 */
export const combineK: <B>(second: LazyArg<IOOption<B>>) => <A>(self: IOOption<A>) => IOOption<A | B> =
  /*#__PURE__*/ optionT.combineK(io.Monad)

/**
 * @category MonoidK
 * @since 3.0.0
 */
export const emptyK: <A>() => IOOption<A> = /*#__PURE__*/ optionT.emptyK(io.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const none: IOOption<never> = /*#__PURE__*/ emptyK()

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact: <A>(foa: IOOption<option.Option<A>>) => IOOption<A> =
  /*#__PURE__*/ compactable.getCompactComposition(io.Functor, option.Compactable)

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: <A, B>(fe: IOOption<Either<A, B>>) => readonly [IOOption<A>, IOOption<B>] =
  /*#__PURE__*/ compactable.getSeparateComposition(io.Functor, option.Compactable, option.Functor)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fga: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ filterable.getFilterMapComposition(io.Functor, option.Filterable)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: IOOption<A>) => readonly [IOOption<B>, IOOption<C>] = /*#__PURE__*/ filterable.getPartitionMapComposition(
  io.Functor,
  option.Filterable
)

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface IOOptionTypeLambda extends TypeLambda {
  readonly type: IOOption<this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<IOOptionTypeLambda> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<IOOptionTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<IOOptionTypeLambda> = {
  map,
  ap
}

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, this effect result returned. If either side fails, then the
 * other side will **NOT** be interrupted.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeftPar: <B>(second: IOOption<B>) => <A>(self: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/ apply.zipLeftPar(Apply)

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of provided effect. If either side fails,
 * then the other side will **NOT** be interrupted.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRightPar: <B>(second: IOOption<B>) => <A>(self: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ apply.zipRightPar(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<IOOptionTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<IOOptionTypeLambda> = {
  map,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tap: <A, _>(f: (a: A) => IOOption<_>) => (self: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category combinatorsError
 * @since 3.0.0
 */
export const tapError: <_>(onNone: () => IOOption<_>) => <A>(self: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/ optionT.tapNone(io.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupK: semigroupK.SemigroupK<IOOptionTypeLambda> = {
  combineK
}

/**
 * @category instances
 * @since 3.0.0
 */
export const MonoidK: monoidK.MonoidK<IOOptionTypeLambda> = {
  combineK,
  emptyK
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard: (b: boolean) => IOOption<void> = /*#__PURE__*/ monoidK.guard(MonoidK, Pointed)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<IOOptionTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: compactable.Compactable<IOOptionTypeLambda> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<IOOptionTypeLambda> = {
  filterMap,
  partitionMap
}

/**
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: IOOption<C>) => IOOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: IOOption<B>) => IOOption<B>
} = /*#__PURE__*/ filterable.filter(Filterable)

/**
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: IOOption<C>
  ) => readonly [IOOption<C>, IOOption<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: IOOption<B>) => readonly [IOOption<B>, IOOption<B>]
} = /*#__PURE__*/ filterable.partition(Filterable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<IOOptionTypeLambda> = {
  fromIO
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: (...x: ReadonlyArray<unknown>) => IOOption<void> = /*#__PURE__*/ fromIO_.log(FromIO)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: (...x: ReadonlyArray<unknown>) => IOOption<void> = /*#__PURE__*/ fromIO_.logError(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => IOOption<B> =
  /*#__PURE__*/ fromIO_.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapIOK: <A, B>(f: (a: A) => IO<B>) => (self: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ fromIO_.flatMapIOK(FromIO, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromOption: fromOption_.FromOption<IOOptionTypeLambda> = {
  fromOption
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: <B extends A, A = B>(predicate: Predicate<A>) => (b: B) => IOOption<B> =
  /*#__PURE__*/ fromOption_.fromPredicate(FromOption)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinement: <C extends A, B extends A, A = C>(refinement: Refinement<A, B>) => (c: C) => IOOption<B> =
  /*#__PURE__*/ fromOption_.fromRefinement(FromOption)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => IOOption<B> =
  /*#__PURE__*/ fromOption_.fromOptionK(FromOption)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => IOOption<NonNullable<A>> = /*#__PURE__*/ fromOption_.fromNullable(FromOption)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => IOOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.fromNullableK(FromOption)

/**
 * @category interop
 * @since 3.0.0
 */
export const flatMapNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: IOOption<A>) => IOOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.flatMapNullableK(FromOption, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<IOOptionTypeLambda> = {
  fromEither
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => IOOption<B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ fromEither_.flatMapEitherK(FromEither, Flattenable)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: IOOption<{}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(fa: IOOption<A>) => IOOption<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOOption<B>
) => (ma: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * @since 3.0.0
 */
export const bindPar: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: IOOption<B>
) => (fa: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindPar(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: IOOption<readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => IOOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => IOOption<ReadonlyNonEmptyArray<B>>) =>
  flow(io.traverseReadonlyNonEmptyArrayWithIndex(f), io.map(option.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => IOOption<B>
): ((as: ReadonlyArray<A>) => IOOption<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, B>(
  f: (a: A) => IOOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => IOOption<ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, B>(
  f: (a: A) => IOOption<B>
): ((as: ReadonlyArray<A>) => IOOption<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<IOOption<A>>) => IOOption<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
