---
title: ReadonlyArray.ts
nav_order: 12
parent: Modules
---

## ReadonlyArray overview

This module provides utility functions for working with arrays in TypeScript.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combining](#combining)
  - [flatMap](#flatmap)
  - [flatMapNonEmpty](#flatmapnonempty)
  - [flatMapNullable](#flatmapnullable)
  - [flatten](#flatten)
  - [flattenNonEmpty](#flattennonempty)
- [constructors](#constructors)
  - [empty](#empty)
  - [make](#make)
  - [makeBy](#makeby)
  - [of](#of)
  - [range](#range)
  - [replicate](#replicate)
  - [unfold](#unfold)
- [conversions](#conversions)
  - [fromEither](#fromeither)
  - [fromIterable](#fromiterable)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
- [do notation](#do-notation)
  - [Do](#do)
  - [andThenBind](#andthenbind)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [separate](#separate)
  - [span](#span)
  - [traverseFilterMap](#traversefiltermap)
  - [traversePartitionMap](#traversepartitionmap)
- [folding](#folding)
  - [combineMap](#combinemap)
  - [combineMapNonEmpty](#combinemapnonempty)
  - [coproductMapKind](#coproductmapkind)
  - [reduce](#reduce)
  - [reduceKind](#reducekind)
  - [reduceRight](#reduceright)
  - [scan](#scan)
  - [scanRight](#scanright)
- [getters](#getters)
  - [chunksOf](#chunksof)
  - [chunksOfNonEmpty](#chunksofnonempty)
  - [drop](#drop)
  - [dropRight](#dropright)
  - [dropWhile](#dropwhile)
  - [findFirst](#findfirst)
  - [findFirstIndex](#findfirstindex)
  - [findLast](#findlast)
  - [findLastIndex](#findlastindex)
  - [get](#get)
  - [head](#head)
  - [headNonEmpty](#headnonempty)
  - [init](#init)
  - [initNonEmpty](#initnonempty)
  - [last](#last)
  - [lastNonEmpty](#lastnonempty)
  - [lefts](#lefts)
  - [length](#length)
  - [rights](#rights)
  - [splitAt](#splitat)
  - [splitNonEmptyAt](#splitnonemptyat)
  - [tail](#tail)
  - [tailNonEmpty](#tailnonempty)
  - [take](#take)
  - [takeRight](#takeright)
  - [takeWhile](#takewhile)
  - [unappend](#unappend)
  - [unprepend](#unprepend)
- [grouping](#grouping)
  - [group](#group)
  - [groupBy](#groupby)
- [guards](#guards)
  - [isEmpty](#isempty)
  - [isNonEmpty](#isnonempty)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Chainable](#chainable)
  - [Covariant](#covariant)
  - [Filterable](#filterable)
  - [FlatMap](#flatmap)
  - [Foldable](#foldable)
  - [Invariant](#invariant)
  - [Monad](#monad)
  - [Of](#of)
  - [Pointed](#pointed)
  - [Product](#product)
  - [SemiApplicative](#semiapplicative)
  - [SemiProduct](#semiproduct)
  - [Traversable](#traversable)
  - [TraversableFilterable](#traversablefilterable)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [getUnionMonoid](#getunionmonoid)
  - [getUnionSemigroup](#getunionsemigroup)
- [lifting](#lifting)
  - [getOrder](#getorder)
  - [lift2](#lift2)
  - [liftEither](#lifteither)
  - [liftMonoid](#liftmonoid)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [mapNonEmpty](#mapnonempty)
  - [tupled](#tupled)
- [models](#models)
  - [NonEmptyArray (type alias)](#nonemptyarray-type-alias)
  - [NonEmptyReadonlyArray (type alias)](#nonemptyreadonlyarray-type-alias)
- [pattern matching](#pattern-matching)
  - [match](#match)
  - [matchLeft](#matchleft)
  - [matchRight](#matchright)
- [predicates](#predicates)
  - [contains](#contains)
  - [every](#every)
  - [some](#some)
- [sorting](#sorting)
  - [sort](#sort)
  - [sortBy](#sortby)
  - [sortByNonEmpty](#sortbynonempty)
  - [sortNonEmpty](#sortnonempty)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [sequenceNonEmpty](#sequencenonempty)
  - [traverse](#traverse)
  - [traverseNonEmpty](#traversenonempty)
  - [traverseTap](#traversetap)
- [type lambdas](#type-lambdas)
  - [ReadonlyArrayTypeLambda (interface)](#readonlyarraytypelambda-interface)
- [unsafe](#unsafe)
  - [unsafeGet](#unsafeget)
- [utils](#utils)
  - [ap](#ap)
  - [append](#append)
  - [appendAll](#appendall)
  - [appendAllNonEmpty](#appendallnonempty)
  - [chop](#chop)
  - [chopNonEmpty](#chopnonempty)
  - [composeKleisliArrow](#composekleisliarrow)
  - [copy](#copy)
  - [difference](#difference)
  - [extend](#extend)
  - [insertAt](#insertat)
  - [intercalate](#intercalate)
  - [intercalateNonEmpty](#intercalatenonempty)
  - [intersection](#intersection)
  - [intersperse](#intersperse)
  - [intersperseNonEmpty](#interspersenonempty)
  - [join](#join)
  - [max](#max)
  - [min](#min)
  - [modify](#modify)
  - [modifyNonEmptyHead](#modifynonemptyhead)
  - [modifyNonEmptyLast](#modifynonemptylast)
  - [modifyOption](#modifyoption)
  - [prepend](#prepend)
  - [prependAll](#prependall)
  - [prependAllNonEmpty](#prependallnonempty)
  - [remove](#remove)
  - [replace](#replace)
  - [replaceOption](#replaceoption)
  - [reverse](#reverse)
  - [reverseNonEmpty](#reversenonempty)
  - [rotate](#rotate)
  - [rotateNonEmpty](#rotatenonempty)
  - [setNonEmptyHead](#setnonemptyhead)
  - [setNonEmptyLast](#setnonemptylast)
  - [traverseFilter](#traversefilter)
  - [traversePartition](#traversepartition)
  - [union](#union)
  - [unionNonEmpty](#unionnonempty)
  - [uniq](#uniq)
  - [uniqNonEmpty](#uniqnonempty)
  - [unzip](#unzip)
  - [unzipNonEmpty](#unzipnonempty)
  - [zip](#zip)
  - [zipNonEmpty](#zipnonempty)
  - [zipNonEmptyWith](#zipnonemptywith)
  - [zipWith](#zipwith)

---

# combining

## flatMap

**Signature**

```ts
export declare const flatMap: {
  <A, B>(f: (a: A, i: number) => readonly B[]): (self: readonly A[]) => B[]
  <A, B>(self: readonly A[], f: (a: A, i: number) => readonly B[]): B[]
}
```

Added in v1.0.0

## flatMapNonEmpty

**Signature**

```ts
export declare const flatMapNonEmpty: {
  <A, B>(f: (a: A, i: number) => readonly [B, ...B[]]): (self: readonly [A, ...A[]]) => [B, ...B[]]
  <A, B>(self: readonly [A, ...A[]], f: (a: A, i: number) => readonly [B, ...B[]]): [B, ...B[]]
}
```

Added in v1.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: {
  <A, B>(f: (a: A) => B | null | undefined): (self: readonly A[]) => NonNullable<B>[]
  <A, B>(self: readonly A[], f: (a: A) => B | null | undefined): NonNullable<B>[]
}
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(self: readonly (readonly A[])[]) => A[]
```

Added in v1.0.0

## flattenNonEmpty

**Signature**

```ts
export declare const flattenNonEmpty: <A>(
  self: readonly [readonly [A, ...A[]], ...(readonly [A, ...A[]])[]]
) => [A, ...A[]]
```

Added in v1.0.0

# constructors

## empty

**Signature**

```ts
export declare const empty: <A = never>() => A[]
```

Added in v1.0.0

## make

Builds a `NonEmptyArray` from an non-empty collection of elements.

**Signature**

```ts
export declare const make: <Elements extends [any, ...any[]]>(
  ...elements: Elements
) => [Elements[number], ...Elements[number][]]
```

Added in v1.0.0

## makeBy

Return a `NonEmptyArray` of length `n` with element `i` initialized with `f(i)`.

**Note**. `n` is normalized to an integer >= 1.

**Signature**

```ts
export declare const makeBy: <A>(n: number, f: (i: number) => A) => [A, ...A[]]
```

**Example**

```ts
import { makeBy } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(
  makeBy(5, (n) => n * 2),
  [0, 2, 4, 6, 8]
)
```

Added in v1.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => [A, ...A[]]
```

Added in v1.0.0

## range

Return a `NonEmptyArray` containing a range of integers, including both endpoints.

**Signature**

```ts
export declare const range: (start: number, end: number) => [number, ...number[]]
```

**Example**

```ts
import { range } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(range(1, 3), [1, 2, 3])
```

Added in v1.0.0

## replicate

Return a `NonEmptyArray` containing a value repeated the specified number of times.

**Note**. `n` is normalized to an integer >= 1.

**Signature**

```ts
export declare const replicate: { (n: number): <A>(a: A) => [A, ...A[]]; <A>(a: A, n: number): [A, ...A[]] }
```

**Example**

```ts
import { replicate } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(replicate('a', 3), ['a', 'a', 'a'])
```

Added in v1.0.0

## unfold

**Signature**

```ts
export declare const unfold: <B, A>(b: B, f: (b: B) => Option<readonly [A, B]>) => A[]
```

Added in v1.0.0

# conversions

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(self: Either<E, A>) => A[]
```

Added in v1.0.0

## fromIterable

**Signature**

```ts
export declare const fromIterable: <A>(collection: Iterable<A>) => A[]
```

Added in v1.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => NonNullable<A>[]
```

Added in v1.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(self: Option<A>) => A[]
```

Added in v1.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: readonly {}[]
```

Added in v1.0.0

## andThenBind

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const andThenBind: {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, that: readonly B[]): (
    self: readonly A[]
  ) => { [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
  <A extends object, N extends string, B>(self: readonly A[], name: Exclude<N, keyof A>, that: readonly B[]): {
    [K in N | keyof A]: K extends keyof A ? A[K] : B
  }[]
}
```

Added in v1.0.0

## bind

**Signature**

```ts
export declare const bind: {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => readonly B[]): (
    self: readonly A[]
  ) => { [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
  <A extends object, N extends string, B>(self: readonly A[], name: Exclude<N, keyof A>, f: (a: A) => readonly B[]): {
    [K in N | keyof A]: K extends keyof A ? A[K] : B
  }[]
}
```

Added in v1.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: {
  <N extends string>(name: N): <A>(self: readonly A[]) => { [K in N]: A }[]
  <A, N extends string>(self: readonly A[], name: N): { [K in N]: A }[]
}
```

Added in v1.0.0

## let

**Signature**

```ts
export declare const let: {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B): (
    self: readonly A[]
  ) => { [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
  <A extends object, N extends string, B>(self: readonly A[], name: Exclude<N, keyof A>, f: (a: A) => B): {
    [K in N | keyof A]: K extends keyof A ? A[K] : B
  }[]
}
```

Added in v1.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <A>(self: Iterable<Option<A>>) => A[]
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(refinement: (a: A, i: number) => a is B): (self: Iterable<C>) => B[]
  <B extends A, A = B>(predicate: (a: A, i: number) => boolean): (self: Iterable<B>) => B[]
  <C extends A, B extends A, A = C>(self: Iterable<C>, refinement: (a: A, i: number) => a is B): B[]
  <B extends A, A = B>(self: Iterable<B>, predicate: (a: A, i: number) => boolean): B[]
}
```

Added in v1.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: {
  <A, B>(f: (a: A, i: number) => Option<B>): (self: Iterable<A>) => B[]
  <A, B>(self: Iterable<A>, f: (a: A, i: number) => Option<B>): B[]
}
```

Added in v1.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, A = C>(refinement: (a: A, i: number) => a is B): (self: Iterable<C>) => [C[], B[]]
  <B extends A, A = B>(predicate: (a: A, i: number) => boolean): (self: Iterable<B>) => [B[], B[]]
  <C extends A, B extends A, A = C>(self: Iterable<C>, refinement: (a: A, i: number) => a is B): [C[], B[]]
  <B extends A, A = B>(self: Iterable<B>, predicate: (a: A, i: number) => boolean): [B[], B[]]
}
```

Added in v1.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: {
  <A, B, C>(f: (a: A, i: number) => Either<B, C>): (self: Iterable<A>) => [B[], C[]]
  <A, B, C>(self: Iterable<A>, f: (a: A, i: number) => Either<B, C>): [B[], C[]]
}
```

Added in v1.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(self: Iterable<Either<A, B>>) => [A[], B[]]
```

Added in v1.0.0

## span

Split an `Iterable` into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

**Signature**

```ts
export declare const span: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => [init: B[], rest: A[]]
  <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => [init: B[], rest: B[]]
  <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): [init: B[], rest: A[]]
  <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): [init: B[], rest: B[]]
}
```

Added in v1.0.0

## traverseFilterMap

**Signature**

```ts
export declare const traverseFilterMap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, Option<B>>): (self: readonly A[]) => Kind<F, R, O, E, B[]>
  <A, R, O, E, B>(self: readonly A[], f: (a: A) => Kind<F, R, O, E, Option<B>>): Kind<F, R, O, E, B[]>
}
```

Added in v1.0.0

## traversePartitionMap

**Signature**

```ts
export declare const traversePartitionMap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B, C>(f: (a: A) => Kind<F, R, O, E, Either<B, C>>): (self: readonly A[]) => Kind<F, R, O, E, [B[], C[]]>
  <A, R, O, E, B, C>(self: readonly A[], f: (a: A) => Kind<F, R, O, E, Either<B, C>>): Kind<F, R, O, E, [B[], C[]]>
}
```

Added in v1.0.0

# folding

## combineMap

**Signature**

```ts
export declare const combineMap: <M>(Monoid: Monoid<M>) => {
  <A>(f: (a: A, i: number) => M): (self: Iterable<A>) => M
  <A>(self: Iterable<A>, f: (a: A, i: number) => M): M
}
```

Added in v1.0.0

## combineMapNonEmpty

**Signature**

```ts
export declare const combineMapNonEmpty: <S>(S: Semigroup<S>) => {
  <A>(f: (a: A, i: number) => S): (self: readonly [A, ...A[]]) => S
  <A>(self: readonly [A, ...A[]], f: (a: A, i: number) => S): S
}
```

Added in v1.0.0

## coproductMapKind

**Signature**

```ts
export declare const coproductMapKind: <G extends TypeLambda>(
  G: Coproduct<G>
) => {
  <A, R, O, E, B>(f: (a: A) => Kind<G, R, O, E, B>): (self: readonly A[]) => Kind<G, R, O, E, B>
  <A, R, O, E, B>(self: readonly A[], f: (a: A) => Kind<G, R, O, E, B>): Kind<G, R, O, E, B>
}
```

Added in v1.0.0

## reduce

**Signature**

```ts
export declare const reduce: {
  <B, A>(b: B, f: (b: B, a: A, i: number) => B): (self: Iterable<A>) => B
  <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A, i: number) => B): B
}
```

Added in v1.0.0

## reduceKind

**Signature**

```ts
export declare const reduceKind: <G extends TypeLambda>(
  G: monad.Monad<G>
) => {
  <B, A, R, O, E>(b: B, f: (b: B, a: A) => Kind<G, R, O, E, B>): (self: readonly A[]) => Kind<G, R, O, E, B>
  <A, B, R, O, E>(self: readonly A[], b: B, f: (b: B, a: A) => Kind<G, R, O, E, B>): Kind<G, R, O, E, B>
}
```

Added in v1.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: {
  <B, A>(b: B, f: (b: B, a: A, i: number) => B): (self: Iterable<A>) => B
  <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A, i: number) => B): B
}
```

Added in v1.0.0

## scan

Reduce an `Iterable` from the left, keeping all intermediate results instead of only the final result.

**Signature**

```ts
export declare const scan: {
  <B, A>(b: B, f: (b: B, a: A) => B): (self: Iterable<A>) => [B, ...B[]]
  <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A) => B): [B, ...B[]]
}
```

Added in v1.0.0

## scanRight

Reduce an `Iterable` from the right, keeping all intermediate results instead of only the final result.

**Signature**

```ts
export declare const scanRight: {
  <B, A>(b: B, f: (b: B, a: A) => B): (self: Iterable<A>) => [B, ...B[]]
  <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A) => B): [B, ...B[]]
}
```

Added in v1.0.0

# getters

## chunksOf

Splits an `Iterable` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the `Iterable`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
definition of `chunksOf`; it satisfies the property that

```ts
chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
```

whenever `n` evenly divides the length of `self`.

**Signature**

```ts
export declare const chunksOf: {
  (n: number): <A>(self: Iterable<A>) => [A, ...A[]][]
  <A>(self: Iterable<A>, n: number): [A, ...A[]][]
}
```

Added in v1.0.0

## chunksOfNonEmpty

Splits a `NonEmptyReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the `NonEmptyReadonlyArray`.

**Signature**

```ts
export declare const chunksOfNonEmpty: {
  (n: number): <A>(self: readonly [A, ...A[]]) => [[A, ...A[]], ...[A, ...A[]][]]
  <A>(self: readonly [A, ...A[]], n: number): [[A, ...A[]], ...[A, ...A[]][]]
}
```

Added in v1.0.0

## drop

Drop a max number of elements from the start of an `Iterable`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const drop: { (n: number): <A>(self: Iterable<A>) => A[]; <A>(self: Iterable<A>, n: number): A[] }
```

Added in v1.0.0

## dropRight

Drop a max number of elements from the end of an `Iterable`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const dropRight: { (n: number): <A>(self: Iterable<A>) => A[]; <A>(self: Iterable<A>, n: number): A[] }
```

Added in v1.0.0

## dropWhile

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.

**Signature**

```ts
export declare const dropWhile: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => B[]
  <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => B[]
  <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): B[]
  <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): B[]
}
```

Added in v1.0.0

## findFirst

Find the first element for which a predicate holds.

**Signature**

```ts
export declare const findFirst: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => Option<B>
  <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => Option<B>
  <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): Option<B>
  <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Option<B>
}
```

Added in v1.0.0

## findFirstIndex

Return the first index for which a predicate holds.

**Signature**

```ts
export declare const findFirstIndex: {
  <A>(predicate: Predicate<A>): (self: Iterable<A>) => Option<number>
  <A>(self: Iterable<A>, predicate: Predicate<A>): Option<number>
}
```

Added in v1.0.0

## findLast

Find the last element for which a predicate holds.

**Signature**

```ts
export declare const findLast: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => Option<B>
  <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => Option<B>
  <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): Option<B>
  <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Option<B>
}
```

Added in v1.0.0

## findLastIndex

Return the last index for which a predicate holds.

**Signature**

```ts
export declare const findLastIndex: {
  <A>(predicate: Predicate<A>): (self: Iterable<A>) => Option<number>
  <A>(self: Iterable<A>, predicate: Predicate<A>): Option<number>
}
```

Added in v1.0.0

## get

This function provides a safe way to read a value at a particular index from a `ReadonlyArray`.

**Signature**

```ts
export declare const get: {
  (index: number): <A>(self: readonly A[]) => Option<A>
  <A>(self: readonly A[], index: number): Option<A>
}
```

Added in v1.0.0

## head

Get the first element of a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

**Signature**

```ts
export declare const head: <A>(self: readonly A[]) => Option<A>
```

Added in v1.0.0

## headNonEmpty

**Signature**

```ts
export declare const headNonEmpty: <A>(self: readonly [A, ...A[]]) => A
```

Added in v1.0.0

## init

Get all but the last element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.

**Signature**

```ts
export declare const init: <A>(self: Iterable<A>) => Option<A[]>
```

Added in v1.0.0

## initNonEmpty

Get all but the last element of a non empty array, creating a new array.

**Signature**

```ts
export declare const initNonEmpty: <A>(self: readonly [A, ...A[]]) => A[]
```

Added in v1.0.0

## last

Get the last element in a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

**Signature**

```ts
export declare const last: <A>(self: readonly A[]) => Option<A>
```

Added in v1.0.0

## lastNonEmpty

**Signature**

```ts
export declare const lastNonEmpty: <A>(self: readonly [A, ...A[]]) => A
```

Added in v1.0.0

## lefts

Return all the `Left` elements from an `Interable` of `Either`s.

**Signature**

```ts
export declare const lefts: <E, A>(self: Iterable<Either<E, A>>) => E[]
```

Added in v1.0.0

## length

Return the number of elements in a `ReadonlyArray`.

**Signature**

```ts
export declare const length: <A>(self: readonly A[]) => number
```

Added in v1.0.0

## rights

Return all the `Right` elements from an `Interable` of `Either`s.

**Signature**

```ts
export declare const rights: <E, A>(self: Iterable<Either<E, A>>) => A[]
```

Added in v1.0.0

## splitAt

Splits an `Iterable` into two pieces, the first piece has max `n` elements.

**Signature**

```ts
export declare const splitAt: {
  (n: number): <A>(self: Iterable<A>) => [A[], A[]]
  <A>(self: Iterable<A>, n: number): [A[], A[]]
}
```

Added in v1.0.0

## splitNonEmptyAt

Splits a `NonEmptyReadonlyArray` into two pieces, the first piece has max `n` elements.

**Signature**

```ts
export declare const splitNonEmptyAt: {
  (n: number): <A>(self: readonly [A, ...A[]]) => [[A, ...A[]], A[]]
  <A>(self: readonly [A, ...A[]], n: number): [[A, ...A[]], A[]]
}
```

Added in v1.0.0

## tail

Get all but the first element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.

**Signature**

```ts
export declare const tail: <A>(self: Iterable<A>) => Option<A[]>
```

Added in v1.0.0

## tailNonEmpty

**Signature**

```ts
export declare const tailNonEmpty: <A>(self: readonly [A, ...A[]]) => A[]
```

Added in v1.0.0

## take

Keep only a max number of elements from the start of an `Iterable`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const take: { (n: number): <A>(self: Iterable<A>) => A[]; <A>(self: Iterable<A>, n: number): A[] }
```

Added in v1.0.0

## takeRight

Keep only a max number of elements from the end of an `Iterable`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const takeRight: { (n: number): <A>(self: Iterable<A>) => A[]; <A>(self: Iterable<A>, n: number): A[] }
```

Added in v1.0.0

## takeWhile

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.

**Signature**

```ts
export declare const takeWhile: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => B[]
  <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => B[]
  <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): B[]
  <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): B[]
}
```

Added in v1.0.0

## unappend

Return a tuple containing a copy of the `NonEmptyReadonlyArray` without its last element, and that last element.

**Signature**

```ts
export declare const unappend: <A>(self: readonly [A, ...A[]]) => [A[], A]
```

Added in v1.0.0

## unprepend

Return a tuple containing the first element, and a new `Array` of the remaining elements, if any.

**Signature**

```ts
export declare const unprepend: <A>(self: readonly [A, ...A[]]) => [A, A[]]
```

Added in v1.0.0

# grouping

## group

Group equal, consecutive elements of a `NonEmptyReadonlyArray` into `NonEmptyArray`s.

**Signature**

```ts
export declare const group: <A>(
  isEquivalent: (self: A, that: A) => boolean
) => (self: readonly [A, ...A[]]) => [[A, ...A[]], ...[A, ...A[]][]]
```

Added in v1.0.0

## groupBy

Splits an `Iterable` into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

**Signature**

```ts
export declare const groupBy: {
  <A>(f: (a: A) => string): (self: Iterable<A>) => Record<string, [A, ...A[]]>
  <A>(self: Iterable<A>, f: (a: A) => string): Record<string, [A, ...A[]]>
}
```

Added in v1.0.0

# guards

## isEmpty

Determine if a `ReadonlyArray` is empty narrowing down the type to `[]`.

**Signature**

```ts
export declare function isEmpty<A>(self: Array<A>): self is []
export declare function isEmpty<A>(self: ReadonlyArray<A>): self is readonly []
```

**Example**

```ts
import { isEmpty } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(isEmpty([]), true)
assert.deepStrictEqual(isEmpty([1, 2, 3]), false)
```

Added in v1.0.0

## isNonEmpty

Determine if a `ReadonlyArray` is non empty narrowing down the type to `NonEmptyArray`.

A `ReadonlyArray` is considered to be a `NonEmptyReadonlyArray` if it contains at least one element.

**Signature**

```ts
export declare const isNonEmpty: {
  <A>(self: A[]): self is [A, ...A[]]
  <A>(self: readonly A[]): self is readonly [A, ...A[]]
}
```

**Example**

```ts
import { isNonEmpty } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(isNonEmpty([]), false)
assert.deepStrictEqual(isNonEmpty([1, 2, 3]), true)
```

Added in v1.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## Chainable

**Signature**

```ts
export declare const Chainable: chainable.Chainable<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## Covariant

**Signature**

```ts
export declare const Covariant: covariant.Covariant<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: filterable.Filterable<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## FlatMap

**Signature**

```ts
export declare const FlatMap: flatMap_.FlatMap<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## Of

**Signature**

```ts
export declare const Of: of_.Of<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product_.Product<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## SemiApplicative

**Signature**

```ts
export declare const SemiApplicative: semiApplicative.SemiApplicative<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: semiProduct.SemiProduct<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## TraversableFilterable

**Signature**

```ts
export declare const TraversableFilterable: traversableFilterable.TraversableFilterable<ReadonlyArrayTypeLambda>
```

Added in v1.0.0

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <A>(
  isEquivalent: (self: A, that: A) => boolean
) => Semigroup<readonly A[]>
```

Added in v1.0.0

## getMonoid

Returns a `Monoid` for `ReadonlyArray<A>`.

**Signature**

```ts
export declare const getMonoid: <A>() => Monoid<readonly A[]>
```

Added in v1.0.0

## getSemigroup

Returns a `Semigroup` for `ReadonlyArray<A>`.

**Signature**

```ts
export declare const getSemigroup: <A>() => Semigroup<readonly A[]>
```

Added in v1.0.0

## getUnionMonoid

**Signature**

```ts
export declare const getUnionMonoid: <A>(isEquivalent: (self: A, that: A) => boolean) => Monoid<readonly A[]>
```

Added in v1.0.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <A>(isEquivalent: (self: A, that: A) => boolean) => Semigroup<readonly A[]>
```

Added in v1.0.0

# lifting

## getOrder

This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
If all elements are equal, the arrays are then compared based on their length.
It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.

**Signature**

```ts
export declare const getOrder: <A>(O: order.Order<A>) => order.Order<readonly A[]>
```

Added in v1.0.0

## lift2

Lifts a binary function into `ReadonlyArray`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => { (self: readonly A[], that: readonly B[]): C[]; (that: readonly B[]): (self: readonly A[]) => C[] }
```

Added in v1.0.0

## liftEither

**Signature**

```ts
export declare const liftEither: <A extends unknown[], E, B>(f: (...a: A) => Either<E, B>) => (...a: A) => B[]
```

Added in v1.0.0

## liftMonoid

**Signature**

```ts
export declare const liftMonoid: <A>(M: Monoid<A>) => Monoid<readonly A[]>
```

Added in v1.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => NonNullable<B>[]
```

Added in v1.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends unknown[], B>(f: (...a: A) => Option<B>) => (...a: A) => B[]
```

Added in v1.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => B[]
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => B[]
}
```

Added in v1.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: { <_, B>(self: readonly _[], b: B): B[]; <B>(b: B): <_>(self: readonly _[]) => B[] }
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: {
  <A, B>(a: A, self: readonly ((a: A) => B)[]): B[]
  <A, B>(self: readonly ((a: A) => B)[]): (a: A) => B[]
}
```

Added in v1.0.0

## map

**Signature**

```ts
export declare const map: {
  <A, B>(f: (a: A, i: number) => B): (self: readonly A[]) => B[]
  <A, B>(self: readonly A[], f: (a: A, i: number) => B): B[]
}
```

Added in v1.0.0

## mapNonEmpty

**Signature**

```ts
export declare const mapNonEmpty: {
  <A, B>(f: (a: A, i: number) => B): (self: readonly [A, ...A[]]) => [B, ...B[]]
  <A, B>(self: readonly [A, ...A[]], f: (a: A, i: number) => B): [B, ...B[]]
}
```

Added in v1.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: readonly A[]) => [A][]
```

Added in v1.0.0

# models

## NonEmptyArray (type alias)

**Signature**

```ts
export type NonEmptyArray<A> = [A, ...Array<A>]
```

Added in v1.0.0

## NonEmptyReadonlyArray (type alias)

**Signature**

```ts
export type NonEmptyReadonlyArray<A> = readonly [A, ...Array<A>]
```

Added in v1.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: {
  <B, A, C = B>(onEmpty: LazyArg<B>, onNonEmpty: (self: readonly [A, ...A[]]) => C): (self: readonly A[]) => B | C
  <A, B, C = B>(self: readonly A[], onEmpty: LazyArg<B>, onNonEmpty: (self: readonly [A, ...A[]]) => C): B | C
}
```

Added in v1.0.0

## matchLeft

**Signature**

```ts
export declare const matchLeft: {
  <B, A, C = B>(onEmpty: LazyArg<B>, onNonEmpty: (head: A, tail: A[]) => C): (self: readonly A[]) => B | C
  <A, B, C = B>(self: readonly A[], onEmpty: LazyArg<B>, onNonEmpty: (head: A, tail: A[]) => C): B | C
}
```

Added in v1.0.0

## matchRight

**Signature**

```ts
export declare const matchRight: {
  <B, A, C = B>(onEmpty: LazyArg<B>, onNonEmpty: (init: A[], last: A) => C): (self: readonly A[]) => B | C
  <A, B, C = B>(self: readonly A[], onEmpty: LazyArg<B>, onNonEmpty: (init: A[], last: A) => C): B | C
}
```

Added in v1.0.0

# predicates

## contains

Returns a function that checks if a `ReadonlyArray` contains a given value using a provided `equivalence` function.

**Signature**

```ts
export declare const contains: <A>(isEquivalent: (self: A, that: A) => boolean) => {
  (a: A): (self: Iterable<A>) => boolean
  (self: Iterable<A>, a: A): boolean
}
```

Added in v1.0.0

## every

Check if a predicate holds true for every `ReadonlyArray` member.

**Signature**

```ts
export declare function every<A, B extends A>(
  refinement: Refinement<A, B>
): Refinement<ReadonlyArray<A>, ReadonlyArray<B>>
export declare function every<A>(predicate: Predicate<A>): Predicate<ReadonlyArray<A>>
```

Added in v1.0.0

## some

Check if a predicate holds true for some `ReadonlyArray` member.

**Signature**

```ts
export declare const some: <A>(predicate: Predicate<A>) => (self: readonly A[]) => self is readonly [A, ...A[]]
```

Added in v1.0.0

# sorting

## sort

Sort the elements of an `Iterable` in increasing order, creating a new `Array`.

**Signature**

```ts
export declare const sort: <B>(O: order.Order<B>) => <A extends B>(self: Iterable<A>) => A[]
```

Added in v1.0.0

## sortBy

Sort the elements of an `Iterable` in increasing order, where elements are compared
using first `orders[0]`, then `orders[1]`, etc...

**Signature**

```ts
export declare const sortBy: <B>(...orders: readonly order.Order<B>[]) => <A extends B>(self: Iterable<A>) => A[]
```

Added in v1.0.0

## sortByNonEmpty

**Signature**

```ts
export declare const sortByNonEmpty: <B>(
  ...orders: readonly order.Order<B>[]
) => <A extends B>(as: readonly [A, ...A[]]) => [A, ...A[]]
```

Added in v1.0.0

## sortNonEmpty

Sort the elements of a `NonEmptyReadonlyArray` in increasing order, creating a new `NonEmptyArray`.

**Signature**

```ts
export declare const sortNonEmpty: <B>(O: order.Order<B>) => <A extends B>(self: readonly [A, ...A[]]) => [A, ...A[]]
```

Added in v1.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <R, O, E, A>(self: readonly Kind<F, R, O, E, A>[]) => Kind<F, R, O, E, A[]>
```

Added in v1.0.0

## sequenceNonEmpty

**Signature**

```ts
export declare const sequenceNonEmpty: <F extends TypeLambda>(
  F: semiApplicative.SemiApplicative<F>
) => <R, O, E, A>(self: readonly [Kind<F, R, O, E, A>, ...Kind<F, R, O, E, A>[]]) => Kind<F, R, O, E, [A, ...A[]]>
```

Added in v1.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(f: (a: A, i: number) => Kind<F, R, O, E, B>): (self: Iterable<A>) => Kind<F, R, O, E, B[]>
  <A, R, O, E, B>(self: Iterable<A>, f: (a: A, i: number) => Kind<F, R, O, E, B>): Kind<F, R, O, E, B[]>
}
```

Added in v1.0.0

## traverseNonEmpty

**Signature**

```ts
export declare const traverseNonEmpty: <F extends TypeLambda>(
  F: semiApplicative.SemiApplicative<F>
) => {
  <A, R, O, E, B>(f: (a: A, i: number) => Kind<F, R, O, E, B>): (
    self: readonly [A, ...A[]]
  ) => Kind<F, R, O, E, [B, ...B[]]>
  <A, R, O, E, B>(self: readonly [A, ...A[]], f: (a: A, i: number) => Kind<F, R, O, E, B>): Kind<
    F,
    R,
    O,
    E,
    [B, ...B[]]
  >
}
```

Added in v1.0.0

## traverseTap

**Signature**

```ts
export declare const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(self: readonly A[], f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, A[]>
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): (self: readonly A[]) => Kind<F, R, O, E, A[]>
}
```

Added in v1.0.0

# type lambdas

## ReadonlyArrayTypeLambda (interface)

**Signature**

```ts
export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this['Target']>
}
```

Added in v1.0.0

# unsafe

## unsafeGet

Gets an element unsafely, will throw on out of bounds.

**Signature**

```ts
export declare const unsafeGet: {
  (index: number): <A>(self: readonly A[]) => A
  <A>(self: readonly A[], index: number): A
}
```

Added in v1.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: {
  <A, B>(self: readonly ((a: A) => B)[], that: readonly A[]): B[]
  <A>(that: readonly A[]): <B>(self: readonly ((a: A) => B)[]) => B[]
}
```

Added in v1.0.0

## append

Append an element to the end of an `Iterable`, creating a new `NonEmptyArray`.

**Signature**

```ts
export declare const append: {
  <B>(last: B): <A>(self: Iterable<A>) => [B | A, ...(B | A)[]]
  <A, B>(self: Iterable<A>, last: B): [A | B, ...(A | B)[]]
}
```

Added in v1.0.0

## appendAll

**Signature**

```ts
export declare const appendAll: {
  <B>(that: Iterable<B>): <A>(self: Iterable<A>) => (B | A)[]
  <A, B>(self: Iterable<A>, that: Iterable<B>): (A | B)[]
}
```

Added in v1.0.0

## appendAllNonEmpty

**Signature**

```ts
export declare const appendAllNonEmpty: {
  <B>(that: readonly [B, ...B[]]): <A>(self: Iterable<A>) => [B | A, ...(B | A)[]]
  <B>(that: Iterable<B>): <A>(self: readonly [A, ...A[]]) => [B | A, ...(B | A)[]]
  <A, B>(self: Iterable<A>, that: readonly [B, ...B[]]): [A | B, ...(A | B)[]]
  <A, B>(self: readonly [A, ...A[]], that: Iterable<B>): [A | B, ...(A | B)[]]
}
```

Added in v1.0.0

## chop

A useful recursion pattern for processing an `Iterable` to produce a new `Array`, often used for "chopping" up the input
`Iterable`. Typically chop is called with some function that will consume an initial prefix of the `Iterable` and produce a
value and the rest of the `Array`.

**Signature**

```ts
export declare const chop: {
  <A, B>(f: (as: readonly [A, ...A[]]) => readonly [B, readonly A[]]): (self: Iterable<A>) => B[]
  <A, B>(self: Iterable<A>, f: (as: readonly [A, ...A[]]) => readonly [B, readonly A[]]): B[]
}
```

Added in v1.0.0

## chopNonEmpty

A useful recursion pattern for processing a `NonEmptyReadonlyArray` to produce a new `NonEmptyReadonlyArray`, often used for "chopping" up the input
`NonEmptyReadonlyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `NonEmptyReadonlyArray` and produce a
value and the tail of the `NonEmptyReadonlyArray`.

**Signature**

```ts
export declare const chopNonEmpty: {
  <A, B>(f: (as: readonly [A, ...A[]]) => readonly [B, readonly A[]]): (self: readonly [A, ...A[]]) => [B, ...B[]]
  <A, B>(self: readonly [A, ...A[]], f: (as: readonly [A, ...A[]]) => readonly [B, readonly A[]]): [B, ...B[]]
}
```

Added in v1.0.0

## composeKleisliArrow

**Signature**

```ts
export declare const composeKleisliArrow: {
  <A, B, C>(afb: (a: A) => readonly B[], bfc: (b: B) => readonly C[]): (a: A) => readonly C[]
  <B, C>(bfc: (b: B) => readonly C[]): <A>(afb: (a: A) => readonly B[]) => (a: A) => readonly C[]
}
```

Added in v1.0.0

## copy

**Signature**

```ts
export declare const copy: { <A>(self: readonly [A, ...A[]]): [A, ...A[]]; <A>(self: readonly A[]): A[] }
```

Added in v1.0.0

## difference

Creates a `Array` of values not included in the other given `Iterable`.
The order and references of result values are determined by the first `Iterable`.

**Signature**

```ts
export declare const difference: <A>(isEquivalent: (self: A, that: A) => boolean) => {
  (that: Iterable<A>): (self: Iterable<A>) => A[]
  (self: Iterable<A>, that: Iterable<A>): A[]
}
```

Added in v1.0.0

## extend

**Signature**

```ts
export declare const extend: {
  <A, B>(f: (as: readonly A[]) => B): (self: readonly A[]) => B[]
  <A, B>(self: readonly A[], f: (as: readonly A[]) => B): B[]
}
```

Added in v1.0.0

## insertAt

Insert an element at the specified index, creating a new `NonEmptyArray`,
or return `None` if the index is out of bounds.

**Signature**

```ts
export declare const insertAt: {
  <B>(i: number, b: B): <A>(self: Iterable<A>) => Option<[B | A, ...(B | A)[]]>
  <A, B>(self: Iterable<A>, i: number, b: B): Option<[A | B, ...(A | B)[]]>
}
```

Added in v1.0.0

## intercalate

Fold an `Iterable`, accumulating values in some `Monoid`, combining adjacent elements
using the specified separator.

**Signature**

```ts
export declare const intercalate: <A>(M: Monoid<A>) => {
  (middle: A): (self: Iterable<A>) => A
  (self: Iterable<A>, middle: A): A
}
```

Added in v1.0.0

## intercalateNonEmpty

Places an element in between members of a `NonEmptyReadonlyArray`, then folds the results using the provided `Semigroup`.

**Signature**

```ts
export declare const intercalateNonEmpty: <A>(S: Semigroup<A>) => {
  (middle: A): (self: readonly [A, ...A[]]) => A
  (self: readonly [A, ...A[]], middle: A): A
}
```

Added in v1.0.0

## intersection

Creates an `Array` of unique values that are included in all given `Iterable`s.
The order and references of result values are determined by the first `Iterable`.

**Signature**

```ts
export declare const intersection: <A>(isEquivalent: (self: A, that: A) => boolean) => {
  (that: Iterable<A>): (self: Iterable<A>) => A[]
  (self: Iterable<A>, that: Iterable<A>): A[]
}
```

Added in v1.0.0

## intersperse

Places an element in between members of an `Iterable`

**Signature**

```ts
export declare const intersperse: {
  <B>(middle: B): <A>(self: Iterable<A>) => (B | A)[]
  <A, B>(self: Iterable<A>, middle: B): (A | B)[]
}
```

Added in v1.0.0

## intersperseNonEmpty

Places an element in between members of a `NonEmptyReadonlyArray`

**Signature**

```ts
export declare const intersperseNonEmpty: {
  <B>(middle: B): <A>(self: readonly [A, ...A[]]) => [B | A, ...(B | A)[]]
  <A, B>(self: readonly [A, ...A[]], middle: B): [A | B, ...(A | B)[]]
}
```

Added in v1.0.0

## join

**Signature**

```ts
export declare const join: {
  (middle: string): (self: ReadonlyArray<string>) => string
  (self: ReadonlyArray<string>, middle: string): string
}
```

Added in v1.0.0

## max

**Signature**

```ts
export declare const max: <A>(O: order.Order<A>) => (self: readonly [A, ...A[]]) => A
```

Added in v1.0.0

## min

**Signature**

```ts
export declare const min: <A>(O: order.Order<A>) => (self: readonly [A, ...A[]]) => A
```

Added in v1.0.0

## modify

Apply a function to the element at the specified index, creating a new `Array`,
or return a copy of the input if the index is out of bounds.

**Signature**

```ts
export declare const modify: {
  <A, B>(i: number, f: (a: A) => B): (self: Iterable<A>) => (A | B)[]
  <A, B>(self: Iterable<A>, i: number, f: (a: A) => B): (A | B)[]
}
```

Added in v1.0.0

## modifyNonEmptyHead

Apply a function to the head, creating a new `NonEmptyReadonlyArray`.

**Signature**

```ts
export declare const modifyNonEmptyHead: {
  <A, B>(f: (a: A) => B): (self: readonly [A, ...A[]]) => [A | B, ...(A | B)[]]
  <A, B>(self: readonly [A, ...A[]], f: (a: A) => B): [A | B, ...(A | B)[]]
}
```

Added in v1.0.0

## modifyNonEmptyLast

Apply a function to the last element, creating a new `NonEmptyReadonlyArray`.

**Signature**

```ts
export declare const modifyNonEmptyLast: {
  <A, B>(f: (a: A) => B): (self: readonly [A, ...A[]]) => [A | B, ...(A | B)[]]
  <A, B>(self: readonly [A, ...A[]], f: (a: A) => B): [A | B, ...(A | B)[]]
}
```

Added in v1.0.0

## modifyOption

Apply a function to the element at the specified index, creating a new `Array`,
or return `None` if the index is out of bounds.

**Signature**

```ts
export declare const modifyOption: {
  <A, B>(i: number, f: (a: A) => B): (self: Iterable<A>) => Option<(A | B)[]>
  <A, B>(self: Iterable<A>, i: number, f: (a: A) => B): Option<(A | B)[]>
}
```

Added in v1.0.0

## prepend

Prepend an element to the front of an `Iterable`, creating a new `NonEmptyArray`.

**Signature**

```ts
export declare const prepend: {
  <B>(head: B): <A>(self: Iterable<A>) => [B | A, ...(B | A)[]]
  <A, B>(self: Iterable<A>, head: B): [A | B, ...(A | B)[]]
}
```

Added in v1.0.0

## prependAll

**Signature**

```ts
export declare const prependAll: {
  <B>(that: Iterable<B>): <A>(self: Iterable<A>) => (B | A)[]
  <A, B>(self: Iterable<A>, that: Iterable<B>): (A | B)[]
}
```

Added in v1.0.0

## prependAllNonEmpty

**Signature**

```ts
export declare const prependAllNonEmpty: {
  <B>(that: readonly [B, ...B[]]): <A>(self: Iterable<A>) => [B | A, ...(B | A)[]]
  <B>(that: Iterable<B>): <A>(self: readonly [A, ...A[]]) => [B | A, ...(B | A)[]]
  <A, B>(self: Iterable<A>, that: readonly [B, ...B[]]): [A | B, ...(A | B)[]]
  <A, B>(self: readonly [A, ...A[]], that: Iterable<B>): [A | B, ...(A | B)[]]
}
```

Added in v1.0.0

## remove

Delete the element at the specified index, creating a new `Array`,
or return a copy of the input if the index is out of bounds.

**Signature**

```ts
export declare const remove: { (i: number): <A>(self: Iterable<A>) => A[]; <A>(self: Iterable<A>, i: number): A[] }
```

Added in v1.0.0

## replace

Change the element at the specified index, creating a new `Array`,
or return a copy of the input if the index is out of bounds.

**Signature**

```ts
export declare const replace: {
  <B>(i: number, b: B): <A>(self: Iterable<A>) => (B | A)[]
  <A, B>(self: Iterable<A>, i: number, b: B): (A | B)[]
}
```

Added in v1.0.0

## replaceOption

**Signature**

```ts
export declare const replaceOption: {
  <B>(i: number, b: B): <A>(self: Iterable<A>) => Option<(B | A)[]>
  <A, B>(self: Iterable<A>, i: number, b: B): Option<(A | B)[]>
}
```

Added in v1.0.0

## reverse

Reverse an `Iterable`, creating a new `Array`.

**Signature**

```ts
export declare const reverse: <A>(self: Iterable<A>) => A[]
```

Added in v1.0.0

## reverseNonEmpty

**Signature**

```ts
export declare const reverseNonEmpty: <A>(self: readonly [A, ...A[]]) => [A, ...A[]]
```

Added in v1.0.0

## rotate

Rotate an `Iterable` by `n` steps.

**Signature**

```ts
export declare const rotate: { (n: number): <A>(self: Iterable<A>) => A[]; <A>(self: Iterable<A>, n: number): A[] }
```

Added in v1.0.0

## rotateNonEmpty

Rotate a `NonEmptyReadonlyArray` by `n` steps.

**Signature**

```ts
export declare const rotateNonEmpty: {
  (n: number): <A>(self: readonly [A, ...A[]]) => [A, ...A[]]
  <A>(self: readonly [A, ...A[]], n: number): [A, ...A[]]
}
```

Added in v1.0.0

## setNonEmptyHead

Change the head, creating a new `NonEmptyReadonlyArray`.

**Signature**

```ts
export declare const setNonEmptyHead: {
  <B>(b: B): <A>(self: readonly [A, ...A[]]) => [B | A, ...(B | A)[]]
  <A, B>(self: readonly [A, ...A[]], b: B): [A | B, ...(A | B)[]]
}
```

Added in v1.0.0

## setNonEmptyLast

Change the last element, creating a new `NonEmptyReadonlyArray`.

**Signature**

```ts
export declare const setNonEmptyLast: {
  <B>(b: B): <A>(self: readonly [A, ...A[]]) => [B | A, ...(B | A)[]]
  <A, B>(self: readonly [A, ...A[]], b: B): [A | B, ...(A | B)[]]
}
```

Added in v1.0.0

## traverseFilter

Filter values inside a context.

**Signature**

```ts
export declare const traverseFilter: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <B extends A, R, O, E, A = B>(predicate: (a: A) => Kind<F, R, O, E, boolean>): (
    self: readonly B[]
  ) => Kind<F, R, O, E, B[]>
  <B extends A, R, O, E, A = B>(self: readonly B[], predicate: (a: A) => Kind<F, R, O, E, boolean>): Kind<
    F,
    R,
    O,
    E,
    B[]
  >
}
```

Added in v1.0.0

## traversePartition

**Signature**

```ts
export declare const traversePartition: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <B extends A, R, O, E, A = B>(predicate: (a: A) => Kind<F, R, O, E, boolean>): (
    self: readonly B[]
  ) => Kind<F, R, O, E, [B[], B[]]>
  <B extends A, R, O, E, A = B>(self: readonly B[], predicate: (a: A) => Kind<F, R, O, E, boolean>): Kind<
    F,
    R,
    O,
    E,
    [B[], B[]]
  >
}
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: <A>(isEquivalent: (self: A, that: A) => boolean) => {
  (that: readonly A[]): (self: readonly A[]) => A[]
  (self: readonly A[], that: readonly A[]): A[]
}
```

Added in v1.0.0

## unionNonEmpty

**Signature**

```ts
export declare const unionNonEmpty: <A>(isEquivalent: (self: A, that: A) => boolean) => {
  (that: readonly [A, ...A[]]): (self: readonly A[]) => [A, ...A[]]
  (that: readonly A[]): (self: readonly [A, ...A[]]) => [A, ...A[]]
  (self: readonly A[], that: readonly [A, ...A[]]): [A, ...A[]]
  (self: readonly [A, ...A[]], that: readonly A[]): [A, ...A[]]
}
```

Added in v1.0.0

## uniq

Remove duplicates from am `Iterable`, keeping the first occurrence of an element.

**Signature**

```ts
export declare const uniq: <A>(isEquivalent: (self: A, that: A) => boolean) => (self: Iterable<A>) => A[]
```

Added in v1.0.0

## uniqNonEmpty

Remove duplicates from a `NonEmptyReadonlyArray`, keeping the first occurrence of an element.

**Signature**

```ts
export declare const uniqNonEmpty: <A>(
  isEquivalent: (self: A, that: A) => boolean
) => (self: readonly [A, ...A[]]) => [A, ...A[]]
```

Added in v1.0.0

## unzip

This function is the inverse of `zip`. Takes an `Iterable` of pairs and return two corresponding `Array`s.

**Signature**

```ts
export declare const unzip: <A, B>(self: Iterable<[A, B]>) => [A[], B[]]
```

Added in v1.0.0

## unzipNonEmpty

**Signature**

```ts
export declare const unzipNonEmpty: <A, B>(self: readonly [[A, B], ...[A, B][]]) => [[A, ...A[]], [B, ...B[]]]
```

Added in v1.0.0

## zip

Takes two `Iterable`s and returns an `Array` of corresponding pairs.
If one input `Iterable` is short, excess elements of the
longer `Iterable` are discarded.

**Signature**

```ts
export declare const zip: {
  <B>(that: Iterable<B>): <A>(self: Iterable<A>) => [A, B][]
  <A, B>(self: Iterable<A>, that: Iterable<B>): [A, B][]
}
```

Added in v1.0.0

## zipNonEmpty

**Signature**

```ts
export declare const zipNonEmpty: {
  <B>(that: readonly [B, ...B[]]): <A>(self: readonly [A, ...A[]]) => [[A, B], ...[A, B][]]
  <A, B>(self: readonly [A, ...A[]], that: readonly [B, ...B[]]): [[A, B], ...[A, B][]]
}
```

Added in v1.0.0

## zipNonEmptyWith

**Signature**

```ts
export declare const zipNonEmptyWith: {
  <B, A, C>(that: readonly [B, ...B[]], f: (a: A, b: B) => C): (self: readonly [A, ...A[]]) => [C, ...C[]]
  <A, B, C>(self: readonly [A, ...A[]], that: readonly [B, ...B[]], f: (a: A, b: B) => C): [C, ...C[]]
}
```

Added in v1.0.0

## zipWith

Apply a function to pairs of elements at the same index in two `Iterable`s, collecting the results in a new `Array`. If one
input `Iterable` is short, excess elements of the longer `Iterable` are discarded.

**Signature**

```ts
export declare const zipWith: {
  <B, A, C>(that: Iterable<B>, f: (a: A, b: B) => C): (self: Iterable<A>) => C[]
  <B, A, C>(self: Iterable<A>, that: Iterable<B>, f: (a: A, b: B) => C): C[]
}
```

Added in v1.0.0
