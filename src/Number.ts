/**
 * This module provides utility functions and type class instances for working with the `number` type in TypeScript.
 * It includes functions for basic arithmetic operations, as well as type class instances for
 * `Equivalence`, `Order`, `Semigroup`, and `Monoid`.
 *
 * @since 1.0.0
 */
import { dual } from "@fp-ts/core/Function"
import type { Ordering } from "@fp-ts/core/Ordering"
import * as predicate from "@fp-ts/core/Predicate"
import * as bounded from "@fp-ts/core/typeclass/Bounded"
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as order from "@fp-ts/core/typeclass/Order"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * Tests if a value is a `number`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isNumber } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(isNumber(2), true)
 * assert.deepStrictEqual(isNumber("2"), false)
 *
 * @category guards
 * @since 1.0.0
 */
export const isNumber: (input: unknown) => input is number = predicate.isNumber

/**
 * Provides an addition operation on numbers.
 * It can be used as a binary function or a curried function.
 *
 * @param self - The first operand.
 * @param that - The second operand.
 *
 * @example
 * import { sum } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(sum(2, 3), 5)
 *
 * @category algebraic operations
 * @since 1.0.0
 */
export const sum: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, semigroup.numberSum.combine)

/**
 * Provides a multiplication operation on numbers.
 * It can be used as a binary function or a curried function.
 *
 * @param self - The first operand.
 * @param that - The second operand.
 *
 * @example
 * import { multiply } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(multiply(2, 3), 6)
 *
 * @category algebraic operations
 * @since 1.0.0
 */
export const multiply: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, semigroup.numberMultiply.combine)

/**
 * Provides a subtraction operation on numbers.
 * It can be used as a binary function or a curried function.
 *
 * @param self - The first operand.
 * @param that - The second operand.
 *
 * @example
 * import { subtract } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(subtract(2, 3), -1)
 *
 * @category algebraic operations
 * @since 1.0.0
 */
export const subtract: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, (self: number, that: number): number => self - that)

/**
 * Provides a division operation on numbers.
 * It can be used as a binary function or a curried function.
 *
 * @param self - The first operand.
 * @param that - The second operand.
 *
 * @example
 * import { divide } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(divide(6, 3), 2)
 *
 * @category algebraic operations
 * @since 1.0.0
 */
export const divide: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, (self: number, that: number): number => self / that)

/**
 * Returns the result of adding `1` to a given number.
 *
 * @param n - A number to be incremented.
 *
 * @example
 * import { increment } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(increment(2), 3)
 *
 * @since 1.0.0
 */
export const increment = (n: number): number => n + 1

/**
 * Decrements a number by `1`.
 *
 * @param n - A number to be decremented.
 *
 * @example
 * import { decrement } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(decrement(3), 2)
 *
 * @since 1.0.0
 */
export const decrement = (n: number): number => n - 1

/**
 * @category instances
 * @since 1.0.0
 */
export const Equivalence: equivalence.Equivalence<number> = equivalence.number

/**
 * @category instances
 * @since 1.0.0
 */
export const Order: order.Order<number> = order.number

/**
 * Returns `true` if the first argument is less than the second, otherwise `false`.
 *
 * @param self - The first argument.
 * @param that - The second argument.
 *
 * @example
 * import { lessThan } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(lessThan(2, 3), true)
 * assert.deepStrictEqual(lessThan(3, 3), false)
 * assert.deepStrictEqual(lessThan(4, 3), false)
 *
 * @category predicates
 * @since 1.0.0
 */
export const lessThan: {
  (that: number): (self: number) => boolean
  (self: number, that: number): boolean
} = order.lessThan(Order)

/**
 * Returns a function that checks if a given number is less than or equal to the provided one.
 *
 * @param self - The first number to compare with.
 * @param that - The second number to compare with.
 *
 * @example
 * import { lessThanOrEqualTo } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(lessThanOrEqualTo(2, 3), true)
 * assert.deepStrictEqual(lessThanOrEqualTo(3, 3), true)
 * assert.deepStrictEqual(lessThanOrEqualTo(4, 3), false)
 *
 * @category predicates
 * @since 1.0.0
 */
export const lessThanOrEqualTo: {
  (that: number): (self: number) => boolean
  (self: number, that: number): boolean
} = order.lessThanOrEqualTo(Order)

/**
 * Returns `true` if the first argument is greater than the second, otherwise `false`.
 *
 * @param self - The first argument.
 * @param that - The second argument.
 *
 * @example
 * import { greaterThan } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(greaterThan(2, 3), false)
 * assert.deepStrictEqual(greaterThan(3, 3), false)
 * assert.deepStrictEqual(greaterThan(4, 3), true)
 *
 * @category predicates
 * @since 1.0.0
 */
export const greaterThan: {
  (that: number): (self: number) => boolean
  (self: number, that: number): boolean
} = order.greaterThan(Order)

/**
 * Returns a function that checks if a given number is greater than or equal to the provided one.
 *
 * @param self - The first number to compare with.
 * @param that - The second number to compare with.
 *
 * @example
 * import { greaterThanOrEqualTo } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(greaterThanOrEqualTo(2, 3), false)
 * assert.deepStrictEqual(greaterThanOrEqualTo(3, 3), true)
 * assert.deepStrictEqual(greaterThanOrEqualTo(4, 3), true)
 *
 * @category predicates
 * @since 1.0.0
 */
export const greaterThanOrEqualTo: {
  (that: number): (self: number) => boolean
  (self: number, that: number): boolean
} = order.greaterThanOrEqualTo(Order)

/**
 * Checks if a number is between a minimum and maximum value (inclusive).
 *
 * @param self - The number to check.
 * @param minimum - The minimum value to check.
 * @param maximum - The maximum value to check.
 *
 * @example
 * import { between } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(between(0, 5)(3), true)
 * assert.deepStrictEqual(between(0, 5)(-1), false)
 * assert.deepStrictEqual(between(0, 5)(6), false)
 *
 * @category predicates
 * @since 1.0.0
 */
export const between: {
  (minimum: number, maximum: number): (self: number) => boolean
  (self: number, minimum: number, maximum: number): boolean
} = order.between(Order)

/**
 * Restricts the given number to be within the range specified by the minimum and maximum values.
 *
 * - If the number is less than the minimum value, the function returns the minimum value.
 * - If the number is greater than the maximum value, the function returns the maximum value.
 * - Otherwise, it returns the original number.
 *
 * @param self - The number to be clamped.
 * @param minimum - The lower end of the range.
 * @param maximum - The upper end of the range.
 *
 * @example
 * import { clamp } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(clamp(0, 5)(3), 3)
 * assert.deepStrictEqual(clamp(0, 5)(-1), 0)
 * assert.deepStrictEqual(clamp(0, 5)(6), 5)
 *
 * @since 1.0.0
 */
export const clamp: {
  (minimum: number, maximum: number): (self: number) => number
  (self: number, minimum: number, maximum: number): number
} = order.clamp(Order)

/**
 * Returns the minimum between two numbers.
 *
 * @param self - The first number.
 * @param that - The second number.
 *
 * @example
 * import { min } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(min(2, 3), 2)
 *
 * @since 1.0.0
 */
export const min: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = order.min(Order)

/**
 * Returns the maximum between two numbers.
 *
 * @param self - The first number.
 * @param that - The second number.
 *
 * @example
 * import { max } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(max(2, 3), 3)
 *
 * @since 1.0.0
 */
export const max: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = order.max(Order)

/**
 * @category instances
 * @since 1.0.0
 */
export const Bounded: bounded.Bounded<number> = bounded.number

/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(SemigroupSum.combine(2, 3), 5)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupSum: semigroup.Semigroup<number> = semigroup.numberSum

/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMax: semigroup.Semigroup<number> = semigroup.max(Order)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMin: semigroup.Semigroup<number> = semigroup.min(Order)

/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupMultiply } from '@fp-ts/core/Number'
 *
 * assert.deepStrictEqual(SemigroupMultiply.combine(2, 3), 6)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMultiply: semigroup.Semigroup<number> = semigroup.numberMultiply

/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidSum: monoid.Monoid<number> = monoid.numberSum

/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidMultiply: monoid.Monoid<number> = monoid.numberMultiply

/**
 * @category instances
 * @since 1.0.0
 */
export const MonoidMax: monoid.Monoid<number> = bounded.max(Bounded)

/**
 * @category instances
 * @since 1.0.0
 */
export const MonoidMin: monoid.Monoid<number> = bounded.min(Bounded)

/**
 * @since 1.0.0
 */
export const sign = (n: number): Ordering => n < 0 ? -1 : n > 0 ? 1 : 0

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const sumAll: (collection: Iterable<number>) => number = MonoidSum.combineAll

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const multiplyAll: (collection: Iterable<number>) => number = MonoidMultiply.combineAll

/**
 * Returns the remainder left over when one operand is divided by a second operand.
 *
 * It always takes the sign of the dividend.
 *
 * @param self - The dividend.
 * @param divisor - The divisor.
 *
 * @example
 * import { remainder } from "@fp-ts/core/Number"
 *
 * assert.deepStrictEqual(remainder(2, 2), 0)
 * assert.deepStrictEqual(remainder(3, 2), 1)
 * assert.deepStrictEqual(remainder(-4, 2), -0)
 *
 * @category algebraic operations
 * @since 1.0.0
 */
export const remainder: {
  (divisor: number): (self: number) => number
  (self: number, divisor: number): number
} = dual(2, (self: number, divisor: number): number => {
  // https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
  const selfDecCount = (self.toString().split(".")[1] || "").length
  const divisorDecCount = (divisor.toString().split(".")[1] || "").length
  const decCount = selfDecCount > divisorDecCount ? selfDecCount : divisorDecCount
  const selfInt = parseInt(self.toFixed(decCount).replace(".", ""))
  const divisorInt = parseInt(divisor.toFixed(decCount).replace(".", ""))
  return (selfInt % divisorInt) / Math.pow(10, decCount)
})

/*

  Missing:

  - toFixed
  - toPrecision
  - toExponential
  - toLocaleString

*/
