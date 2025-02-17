/**
 * This module provides utility functions for working with records in TypeScript.
 *
 * @since 1.0.0
 */

import type { Either } from "@fp-ts/core/Either"
import * as E from "@fp-ts/core/Either"
import { dual, identity } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Option } from "@fp-ts/core/Option"
import * as O from "@fp-ts/core/Option"
import type * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type * as filterable from "@fp-ts/core/typeclass/Filterable"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import * as traversable from "@fp-ts/core/typeclass/Traversable"
import * as traversableFilterable from "@fp-ts/core/typeclass/TraversableFilterable"

// -------------------------------------------------------------------------------------
// models
// -------------------------------------------------------------------------------------

/**
 * @category models
 * @since 1.0.0
 */
export interface ReadonlyRecord<A> {
  readonly [x: string]: A
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface ReadonlyRecordTypeLambda extends TypeLambda {
  readonly type: ReadonlyRecord<this["Target"]>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Creates a new, empty record.
 *
 * @category constructors
 * @since 1.0.0
 */
export const empty = <A>(): Record<string, A> => ({})

/**
 * Takes an iterable and a projection function and returns a record.
 * The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.
 *
 * @param self - An iterable of values to be mapped to a record.
 * @param f - A projection function that maps values of the iterable to a tuple of a key and a value.
 *
 * @example
 * import { fromIterable } from '@fp-ts/core/ReadonlyRecord'
 *
 * const input = [1, 2, 3, 4]
 *
 * assert.deepStrictEqual(
 *   fromIterable(input, a => [String(a), a * 2]),
 *   { '1': 2, '2': 4, '3': 6, '4': 8 }
 * )
 *
 * @category constructors
 * @since 1.0.0
 */
export const fromIterable: {
  <A, B>(f: (a: A) => readonly [string, B]): (self: Iterable<A>) => Record<string, B>
  <A, B>(self: Iterable<A>, f: (a: A) => readonly [string, B]): Record<string, B>
} = dual(2, <A, B>(self: Iterable<A>, f: (a: A) => readonly [string, B]): Record<string, B> => {
  const out: Record<string, B> = {}
  for (const a of self) {
    const [k, b] = f(a)
    out[k] = b
  }
  return out
})

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------

/**
 * Determine if a `ReadonlyRecord` is empty.
 *
 * @param self - `ReadonlyRecord` to test for emptiness.
 *
 * @example
 * import { isEmpty } from "@fp-ts/core/ReadonlyRecord"
 *
 * assert.deepStrictEqual(isEmpty({}), true);
 * assert.deepStrictEqual(isEmpty({ a: 3 }), false);
 *
 * @category guards
 * @since 1.0.0
 */
export const isEmpty = <A>(self: ReadonlyRecord<A>): self is Record<string, never> => {
  for (const k in self) {
    if (has(self, k)) {
      return false
    }
  }
  return true
}

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

/**
 * Transforms the values of a `ReadonlyRecord` into an `Array` with a custom mapping function.
 *
 * @param self - The `ReadonlyRecord` to transform.
 * @param f - The custom mapping function to apply to each key/value of the `ReadonlyRecord`.
 *
 * @example
 * import { collect } from '@fp-ts/core/ReadonlyRecord'
 *
 * const x = { a: 1, b: 2, c: 3 }
 * assert.deepStrictEqual(collect(x, (key, n) => [key, n]), [["a", 1], ["b", 2], ["c", 3]])
 *
 * @category conversions
 * @since 1.0.0
 */
export const collect: {
  <A, B>(f: (key: string, a: A) => B): (self: ReadonlyRecord<A>) => Array<B>
  <A, B>(self: ReadonlyRecord<A>, f: (key: string, a: A) => B): Array<B>
} = dual(
  2,
  <A, B>(self: ReadonlyRecord<A>, f: (key: string, a: A) => B): Array<B> => {
    const out: Array<B> = []
    for (const key of Object.keys(self)) {
      out.push(f(key, self[key]))
    }
    return out
  }
)

/**
 * Converts a `ReadonlyRecord` to an `Array` of key-value pairs.
 *
 * @param self - A `ReadonlyRecord` to convert to an `Array`.
 *
 * @example
 * import { toArray } from '@fp-ts/core/ReadonlyRecord'
 *
 * const x = { a: 1, b: 2 }
 * assert.deepStrictEqual(toArray(x), [["a", 1], ["b", 2]])
 *
 * @category conversions
 * @since 1.0.0
 */
export const toArray: <A>(self: ReadonlyRecord<A>) => Array<[string, A]> = collect((
  key,
  a
) => [key, a])

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Returns the number of key/value pairs in a `ReadonlyRecord`.
 *
 * @param self - A `ReadonlyRecord` to calculate the number of key/value pairs in.
 *
 * @example
 * import { size } from "@fp-ts/core/ReadonlyRecord";
 *
 * assert.deepStrictEqual(size({ a: "a", b: 1, c: true }), 3);
 *
 * @since 1.0.0
 */
export const size = <A>(self: ReadonlyRecord<A>): number => Object.keys(self).length

/**
 * Check if a given `key` exists in a `ReadonlyRecord`.
 *
 * @param self - the `ReadonlyRecord` to look in.
 * @param key - the key to look for in the `ReadonlyRecord`.
 *
 * @example
 * import { has } from '@fp-ts/core/ReadonlyRecord'
 *
 * assert.deepStrictEqual(has({ a: 1, b: 2 }, "a"), true);
 * assert.deepStrictEqual(has({ a: 1, b: 2 }, "c"), false);
 *
 * @since 1.0.0
 */
export const has: {
  (key: string): <A>(self: ReadonlyRecord<A>) => boolean
  <A>(self: ReadonlyRecord<A>, key: string): boolean
} = dual(
  2,
  <A>(self: ReadonlyRecord<A>, key: string): boolean =>
    Object.prototype.hasOwnProperty.call(self, key)
)

/**
 * Retrieve a value at a particular key from a `ReadonlyRecord`, returning it wrapped in an `Option`.
 *
 * @param self - The `ReadonlyRecord` to retrieve value from.
 * @param key - Key to retrieve from `ReadonlyRecord`.
 *
 * @example
 * import { get } from "@fp-ts/core/ReadonlyRecord"
 * import { some, none } from "@fp-ts/core/Option"
 *
 * const person = { name: "John Doe", age: 35 }
 *
 * assert.deepStrictEqual(get(person, "name"), some("John Doe"))
 * assert.deepStrictEqual(get(person, "email"), none())
 *
 * @since 1.0.0
 */
export const get: {
  (key: string): <A>(self: ReadonlyRecord<A>) => Option<A>
  <A>(self: ReadonlyRecord<A>, key: string): Option<A>
} = dual(
  2,
  <A>(self: ReadonlyRecord<A>, key: string): Option<A> =>
    has(self, key) ? O.some(self[key]) : O.none()
)

/**
 * Apply a function to the element at the specified key, creating a new record,
 * or return `None` if the key doesn't exist.
 *
 * @param self - The `ReadonlyRecord` to be updated.
 * @param key - The key of the element to modify.
 * @param f - The function to apply to the element.
 *
 * @example
 * import { modifyOption } from "@fp-ts/core/ReadonlyRecord"
 * import { some, none } from "@fp-ts/core/Option"
 *
 * const f = (x: number) => x * 2
 *
 * assert.deepStrictEqual(
 *  modifyOption({ a: 3 }, 'a', f),
 *  some({ a: 6 })
 * )
 * assert.deepStrictEqual(
 *  modifyOption({ a: 3 }, 'b', f),
 *  none()
 * )
 *
 * @since 1.0.0
 */
export const modifyOption: {
  <A, B>(key: string, f: (a: A) => B): (self: ReadonlyRecord<A>) => Option<Record<string, A | B>>
  <A, B>(self: ReadonlyRecord<A>, key: string, f: (a: A) => B): Option<Record<string, A | B>>
} = dual(
  3,
  <A, B>(self: ReadonlyRecord<A>, key: string, f: (a: A) => B): Option<Record<string, A | B>> => {
    if (!has(self, key)) {
      return O.none()
    }
    const out: Record<string, A | B> = { ...self }
    out[key] = f(self[key])
    return O.some(out)
  }
)

/**
 * Replaces a value in the record with the new value passed as parameter.
 *
 * @param self - The `ReadonlyRecord` to be updated.
 * @param key - The key to search for in the record.
 * @param b - The new value to replace the existing value with.
 *
 * @example
 * import { replaceOption } from "@fp-ts/core/ReadonlyRecord"
 * import { some, none } from "@fp-ts/core/Option"
 *
 * assert.deepStrictEqual(
 *   replaceOption({ a: 1, b: 2, c: 3 }, 'a', 10),
 *   some({ a: 10, b: 2, c: 3 })
 * )
 * assert.deepStrictEqual(replaceOption({}, 'a', 10), none())
 *
 * @since 1.0.0
 */
export const replaceOption: {
  <B>(key: string, b: B): <A>(self: ReadonlyRecord<A>) => Option<Record<string, B | A>>
  <A, B>(self: ReadonlyRecord<A>, key: string, b: B): Option<Record<string, A | B>>
} = dual(
  3,
  <A, B>(self: ReadonlyRecord<A>, key: string, b: B): Option<Record<string, A | B>> =>
    modifyOption(self, key, () => b)
)

/**
 * Removes a key from a `ReadonlyRecord` and returns a new `Record`
 *
 * @param self - the `ReadonlyRecord` to remove the key from.
 * @param key - the key to remove from the `ReadonlyRecord`.
 *
 * @example
 * import { remove } from '@fp-ts/core/ReadonlyRecord'
 *
 * assert.deepStrictEqual(remove({ a: 1, b: 2 }, "a"), { b: 2 })
 *
 * @since 1.0.0
 */
export const remove: {
  (key: string): <A>(self: ReadonlyRecord<A>) => Record<string, A>
  <A>(self: ReadonlyRecord<A>, key: string): Record<string, A>
} = dual(2, <A>(self: ReadonlyRecord<A>, key: string): Record<string, A> => {
  const out: Record<string, A> = { ...self }
  delete out[key]
  return out
})

/**
 * Retrieves the value of the property with the given `key` from a `ReadonlyRecord` and returns an `Option`
 * of a tuple with the value and the `ReadonlyRecord` with the removed property.
 * If the key is not present, returns `O.none`.
 *
 * @param self - The input `ReadonlyRecord`.
 * @param key - The key of the property to retrieve.
 *
 * @example
 * import { pop } from '@fp-ts/core/ReadonlyRecord'
 * import { some, none } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(pop({ a: 1, b: 2 }, "a"), some([1, { b: 2 }]))
 * assert.deepStrictEqual(pop({ a: 1, b: 2 }, "c"), none())
 *
 * @category record
 * @since 1.0.0
 */
export const pop: {
  (key: string): <A>(self: ReadonlyRecord<A>) => Option<readonly [A, ReadonlyRecord<A>]>
  <A>(self: ReadonlyRecord<A>, key: string): Option<readonly [A, ReadonlyRecord<A>]>
} = dual(2, <A>(
  self: ReadonlyRecord<A>,
  key: string
): Option<readonly [A, ReadonlyRecord<A>]> =>
  has(self, key) ? O.some([self[key], remove(self, key)]) : O.none())

/**
 * Maps a `ReadonlyRecord` into another `Record` by applying a transformation function to each of its values.
 *
 * @param self - The `ReadonlyRecord` to be mapped.
 * @param f - A transformation function that will be applied to each of the values in the `ReadonlyRecord`.
 *
 * @example
 * import { map } from "@fp-ts/core/ReadonlyRecord"
 *
 * const f = (n: number) => `-${n}`
 *
 * assert.deepStrictEqual(map({ a: 3, b: 5 }, f), { a: "-3", b: "-5" })
 *
 * const g = (n: number, key: string) => `${key.toUpperCase()}-${n}`
 *
 * assert.deepStrictEqual(map({ a: 3, b: 5 }, g), { a: "A-3", b: "B-5" })
 *
 * @since 1.0.0
 */
export const map: {
  <A, B>(f: (a: A, key: string) => B): (self: ReadonlyRecord<A>) => Record<string, B>
  <A, B>(self: ReadonlyRecord<A>, f: (a: A, key: string) => B): Record<string, B>
} = dual(
  2,
  <A, B>(self: ReadonlyRecord<A>, f: (a: A, key: string) => B): Record<string, B> => {
    const out: Record<string, B> = {}
    for (const key of Object.keys(self)) {
      out[key] = f(self[key], key)
    }
    return out
  }
)

/**
 * Transforms a `ReadonlyRecord` into a `Record` by applying the function `f` to each key and value in the original `ReadonlyRecord`.
 * If the function returns `Some`, the key-value pair is included in the output `Record`.
 *
 * @param self - The input `ReadonlyRecord`.
 * @param f - The transformation function.
 *
 * @example
 * import { filterMap } from '@fp-ts/core/ReadonlyRecord'
 * import { some, none } from '@fp-ts/core/Option'
 *
 * const x = { a: 1, b: 2, c: 3 }
 * const f = (a: number, key: string) => a > 2 ? some(a * 2) : none()
 * assert.deepStrictEqual(filterMap(x, f), { c: 6 })
 *
 * @since 1.0.0
 */
export const filterMap: {
  <A, B>(f: (a: A, key: string) => Option<B>): (self: ReadonlyRecord<A>) => Record<string, B>
  <A, B>(self: ReadonlyRecord<A>, f: (a: A, key: string) => Option<B>): Record<string, B>
} = dual(2, <A, B>(
  self: ReadonlyRecord<A>,
  f: (a: A, key: string) => Option<B>
): Record<string, B> => {
  const out: Record<string, B> = {}
  for (const key of Object.keys(self)) {
    const o = f(self[key], key)
    if (O.isSome(o)) {
      out[key] = o.value
    }
  }
  return out
})

/**
 * Selects properties from a record whose values match the given predicate.
 *
 * @param self - The `ReadonlyRecord` to filter.
 * @param predicate - A function that returns a `boolean` value to determine if the entry should be included in the new record.
 *
 * @example
 * import { filter } from '@fp-ts/core/ReadonlyRecord'
 *
 * const x = { a: 1, b: 2, c: 3, d: 4 }
 * assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 })
 *
 * @category filtering
 * @since 1.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(
    refinement: (a: A, key: string) => a is B
  ): (self: ReadonlyRecord<C>) => Record<string, B>
  <B extends A, A = B>(
    predicate: (a: A, key: string) => boolean
  ): (self: ReadonlyRecord<B>) => Record<string, B>
  <C extends A, B extends A, A = C>(
    self: ReadonlyRecord<C>,
    refinement: (a: A, key: string) => a is B
  ): Record<string, B>
  <B extends A, A = B>(
    self: ReadonlyRecord<B>,
    predicate: (a: A, key: string) => boolean
  ): Record<string, B>
} = dual(
  2,
  <B extends A, A = B>(
    self: ReadonlyRecord<B>,
    predicate: (a: A, key: string) => boolean
  ): Record<string, B> => {
    const out: Record<string, B> = {}
    for (const key of Object.keys(self)) {
      if (predicate(self[key], key)) {
        out[key] = self[key]
      }
    }
    return out
  }
)

/**
 * Given a `ReadonlyRecord` with `Option` values, returns a `Record` with only the `Some` values, with the same keys.
 *
 * @param self - A `ReadonlyRecord` with `Option` values.
 *
 * @example
 * import { compact } from '@fp-ts/core/ReadonlyRecord'
 * import { some, none } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(
 *   compact({ a: some(1), b: none(), c: some(2) }),
 *   { a: 1, c: 2 }
 * )
 *
 * @category filtering
 * @since 1.0.0
 */
export const compact: <A>(self: ReadonlyRecord<Option<A>>) => Record<string, A> = filterMap(
  identity
)

/**
 * Partitions the elements of a `ReadonlyRecord` into two groups: those that match a predicate, and those that don't.
 *
 * @param self - The `ReadonlyRecord` to partition.
 * @param f - The predicate function to apply to each element.
 *
 * @example
 * import { partitionMap } from '@fp-ts/core/ReadonlyRecord'
 * import { left, right } from '@fp-ts/core/Either'
 *
 * const x = { a: 1, b: 2, c: 3 }
 * const f = (n: number) => (n % 2 === 0 ? right(n) : left(n))
 * assert.deepStrictEqual(partitionMap(x, f), [{ a: 1, c: 3 }, { b: 2}])
 *
 * @category filtering
 * @since 1.0.0
 */
export const partitionMap: {
  <A, B, C>(
    f: (a: A, key: string) => Either<B, C>
  ): (self: ReadonlyRecord<A>) => [Record<string, B>, Record<string, C>]
  <A, B, C>(
    self: ReadonlyRecord<A>,
    f: (a: A, key: string) => Either<B, C>
  ): [Record<string, B>, Record<string, C>]
} = dual(
  2,
  <A, B, C>(
    self: ReadonlyRecord<A>,
    f: (a: A, key: string) => Either<B, C>
  ): [Record<string, B>, Record<string, C>] => {
    const left: Record<string, B> = {}
    const right: Record<string, C> = {}
    for (const key of Object.keys(self)) {
      const e = f(self[key], key)
      if (E.isLeft(e)) {
        left[key] = e.left
      } else {
        right[key] = e.right
      }
    }
    return [left, right]
  }
)

/**
 * Partitions a `ReadonlyRecord` of `Either` values into two separate records,
 * one with the `Left` values and one with the `Right` values.
 *
 * @param self - the `ReadonlyRecord` to partition.
 *
 * @example
 * import { separate } from '@fp-ts/core/ReadonlyRecord'
 * import { left, right } from '@fp-ts/core/Either'
 *
 * assert.deepStrictEqual(
 *   separate({ a: left("e"), b: right(1) }),
 *   [{ a: "e" }, { b: 1 }]
 * )
 *
 * @category filtering
 * @since 1.0.0
 */
export const separate: <A, B>(
  self: ReadonlyRecord<Either<A, B>>
) => [Record<string, A>, Record<string, B>] = partitionMap(identity)

/**
 * Partitions a `ReadonlyRecord` into two separate `Record`s based on the result of a predicate function.
 *
 * @param self - The input `ReadonlyRecord` to partition.
 * @param predicate - The partitioning function to determine the partitioning of each value of the `ReadonlyRecord`.
 *
 * @example
 * import { partition } from '@fp-ts/core/ReadonlyRecord'
 *
 * assert.deepStrictEqual(
 *   partition({ a: 1, b: 3 }, (n) => n > 2),
 *   [{ a: 1 }, { b: 3 }]
 * )
 *
 * @category filtering
 * @since 1.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: (a: A, key: string) => a is B): (
    self: ReadonlyRecord<C>
  ) => [Record<string, C>, Record<string, B>]
  <B extends A, A = B>(
    predicate: (a: A, key: string) => boolean
  ): (self: ReadonlyRecord<B>) => [Record<string, B>, Record<string, B>]
  <C extends A, B extends A, A = C>(
    self: ReadonlyRecord<C>,
    refinement: (a: A, key: string) => a is B
  ): [Record<string, C>, Record<string, B>]
  <B extends A, A = B>(
    self: ReadonlyRecord<B>,
    predicate: (a: A, key: string) => boolean
  ): [Record<string, B>, Record<string, B>]
} = dual(
  2,
  <B extends A, A = B>(
    self: ReadonlyRecord<B>,
    predicate: (a: A, key: string) => boolean
  ): [Record<string, B>, Record<string, B>] => {
    const left: Record<string, B> = {}
    const right: Record<string, B> = {}
    for (const key of Object.keys(self)) {
      if (predicate(self[key], key)) {
        right[key] = self[key]
      } else {
        left[key] = self[key]
      }
    }
    return [left, right]
  }
)

/**
 * Maps each entry of a `ReadonlyRecord` to an effect and collects the results into a new record.
 *
 * @param F - an {@link applicative.Applicative Applicative} instance.
 * @param self - a `ReadonlyRecord` to map over.
 * @param f - the mapping function, which maps an entry `a` and its corresponding `key` to an effect.
 *
 * @example
 * import { traverse } from '@fp-ts/core/ReadonlyRecord'
 * import { some, none, Applicative } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(
 *   traverse(Applicative)({ a: 1, b: 2 }, (n: number) => (n <= 2 ? some(n) : none())),
 *   some({ a: 1, b: 2 })
 * )
 * assert.deepStrictEqual(
 *   traverse(Applicative)({ a: 1, b: 2 }, (n: number) => (n >= 2 ? some(n) : none())),
 *   none()
 * )
 *
 * @category traversing
 * @since 1.0.0
 */
export const traverse = <F extends TypeLambda>(F: applicative.Applicative<F>): {
  <A, R, O, E, B>(
    f: (a: A, key: string) => Kind<F, R, O, E, B>
  ): (self: ReadonlyRecord<A>) => Kind<F, R, O, E, Record<string, B>>
  <A, R, O, E, B>(
    self: ReadonlyRecord<A>,
    f: (a: A, key: string) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Record<string, B>>
} =>
  dual(2, <A, R, O, E, B>(
    self: ReadonlyRecord<A>,
    f: (a: A, key: string) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Record<string, B>> =>
    F.map(
      F.productAll(
        Object.entries(self).map(([key, a]) => F.map(f(a, key), b => [key, b] as const))
      ),
      Object.fromEntries
    ))

/**
 * Transforms a `ReadonlyRecord` of `Kind` values into a `Kind` of `Record` values.
 *
 * @param F - an {@link applicative.Applicative Applicative} instance.
 * @param self - the `ReadonlyRecord` of `Kind` values.
 *
 * @example
 * import * as RR from '@fp-ts/core/ReadonlyRecord'
 * import { some, none, Applicative } from '@fp-ts/core/Option'
 *
 * const sequence = RR.sequence(Applicative)
 *
 * assert.deepStrictEqual(sequence({ a: some(1), b: some(2) }), some({ a: 1, b: 2 }))
 * assert.deepStrictEqual(sequence({ a: none(), b: some(2) }), none())
 *
 * @category traversing
 * @since 1.0.0
 */
export const sequence = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): <R, O, E, A>(
  self: ReadonlyRecord<Kind<F, R, O, E, A>>
) => Kind<F, R, O, E, Record<string, A>> => traverse(F)(identity)

const imap = covariant.imap<ReadonlyRecordTypeLambda>(map)

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<ReadonlyRecordTypeLambda> = {
  imap,
  map
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<ReadonlyRecordTypeLambda> = {
  imap
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const tupled: <A>(self: ReadonlyRecord<A>) => Record<string, [A]> = invariant.tupled(
  Invariant
)

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap: {
  <A, B>(self: ReadonlyRecord<(a: A) => B>): (a: A) => Record<string, B>
  <A, B>(a: A, self: ReadonlyRecord<(a: A) => B>): Record<string, B>
} = covariant.flap(Covariant)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const as: {
  <B>(b: B): <_>(self: ReadonlyRecord<_>) => Record<string, B>
  <_, B>(self: ReadonlyRecord<_>, b: B): Record<string, B>
} = covariant.as(Covariant)

/**
 * @category instances
 * @since 1.0.0
 */
export const Filterable: filterable.Filterable<ReadonlyRecordTypeLambda> = {
  partitionMap,
  filterMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<ReadonlyRecordTypeLambda> = {
  traverse
}

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): (self: ReadonlyRecord<A>) => Kind<F, R, O, E, Record<string, A>>
  <A, R, O, E, B>(
    self: ReadonlyRecord<A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Record<string, A>>
} = traversable.traverseTap(Traversable)

/**
 * @category filtering
 * @since 1.0.0
 */
export const traversePartitionMap = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B, C>(
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ): (
    self: ReadonlyRecord<A>
  ) => Kind<F, R, O, E, [Record<string, B>, Record<string, C>]>
  <A, R, O, E, B, C>(
    self: ReadonlyRecord<A>,
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ): Kind<F, R, O, E, [Record<string, B>, Record<string, C>]>
} =>
  dual(2, <A, R, O, E, B, C>(
    self: ReadonlyRecord<A>,
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ): Kind<F, R, O, E, [Record<string, B>, Record<string, C>]> => {
    return F.map(traverse(F)(self, f), separate)
  })

/**
 * @category filtering
 * @since 1.0.0
 */
export const traverseFilterMap = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ): (self: ReadonlyRecord<A>) => Kind<F, R, O, E, Record<string, B>>
  <A, R, O, E, B>(
    self: ReadonlyRecord<A>,
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ): Kind<F, R, O, E, Record<string, B>>
} =>
  dual(2, <A, R, O, E, B>(
    self: ReadonlyRecord<A>,
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ): Kind<F, R, O, E, Record<string, B>> => {
    return F.map(traverse(F)(self, f), compact)
  })

/**
 * @category instances
 * @since 1.0.0
 */
export const TraversableFilterable: traversableFilterable.TraversableFilterable<
  ReadonlyRecordTypeLambda
> = {
  traversePartitionMap,
  traverseFilterMap
}

/**
 * Filter values inside a context.
 *
 * @since 1.0.0
 */
export const traverseFilter: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <B extends A, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, R, O, E, boolean>
  ): (self: ReadonlyRecord<B>) => Kind<F, R, O, E, Record<string, B>>
  <B extends A, R, O, E, A = B>(
    self: ReadonlyRecord<B>,
    predicate: (a: A) => Kind<F, R, O, E, boolean>
  ): Kind<F, R, O, E, Record<string, B>>
} = traversableFilterable.traverseFilter(TraversableFilterable)

/**
 * @since 1.0.0
 */
export const traversePartition: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <B extends A, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, R, O, E, boolean>
  ): (
    self: ReadonlyRecord<B>
  ) => Kind<F, R, O, E, [Record<string, B>, Record<string, B>]>
  <B extends A, R, O, E, A = B>(
    self: ReadonlyRecord<B>,
    predicate: (a: A) => Kind<F, R, O, E, boolean>
  ): Kind<F, R, O, E, [Record<string, B>, Record<string, B>]>
} = traversableFilterable.traversePartition(TraversableFilterable)
