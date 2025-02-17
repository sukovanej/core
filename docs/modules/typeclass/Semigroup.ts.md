---
title: typeclass/Semigroup.ts
nav_order: 41
parent: Modules
---

## Semigroup overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [array](#array)
  - [struct](#struct)
  - [tuple](#tuple)
- [combining](#combining)
  - [all](#all)
- [constructors](#constructors)
  - [constant](#constant)
  - [make](#make)
  - [max](#max)
  - [min](#min)
- [instances](#instances)
  - [Invariant](#invariant)
  - [Product](#product)
  - [SemiProduct](#semiproduct)
  - [bigintMultiply](#bigintmultiply)
  - [bigintSum](#bigintsum)
  - [booleanAll](#booleanall)
  - [booleanAny](#booleanany)
  - [booleanEqv](#booleaneqv)
  - [booleanXor](#booleanxor)
  - [first](#first)
  - [last](#last)
  - [numberMultiply](#numbermultiply)
  - [numberSum](#numbersum)
  - [string](#string)
- [type class](#type-class)
  - [Semigroup (interface)](#semigroup-interface)
- [type lambdas](#type-lambdas)
  - [SemigroupTypeLambda (interface)](#semigrouptypelambda-interface)
- [utils](#utils)
  - [imap](#imap)
  - [intercalate](#intercalate)
  - [reverse](#reverse)

---

# combinators

## array

Given a type `A`, this function creates and returns a `Semigroup` for `ReadonlyArray<A>`.
The returned `Semigroup` combines two arrays by concatenating them.

**Signature**

```ts
export declare const array: <A>() => Semigroup<readonly A[]>
```

Added in v1.0.0

## struct

This function creates and returns a new `Semigroup` for a struct of values based on the given `Semigroup`s for each property in the struct.
The returned `Semigroup` combines two structs of the same type by applying the corresponding `Semigroup` passed as arguments to each property in the struct.

It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.

**Signature**

```ts
export declare const struct: <R extends { readonly [x: string]: Semigroup<any> }>(
  fields: R
) => Semigroup<{ readonly [K in keyof R]: [R[K]] extends [Semigroup<infer A>] ? A : never }>
```

Added in v1.0.0

## tuple

Similar to `Promise.all` but operates on `Semigroup`s.

```
[Semigroup<A>, Semigroup<B>, ...] -> Semigroup<[A, B, ...]>
```

This function creates and returns a new `Semigroup` for a tuple of values based on the given `Semigroup`s for each element in the tuple.
The returned `Semigroup` combines two tuples of the same type by applying the corresponding `Semigroup` passed as arguments to each element in the tuple.

It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.

**Signature**

```ts
export declare const tuple: <T extends readonly Semigroup<any>[]>(
  ...elements: T
) => Semigroup<{ readonly [I in keyof T]: [T[I]] extends [Semigroup<infer A>] ? A : never }>
```

Added in v1.0.0

# combining

## all

Similar to `Promise.all` but operates on `Semigroup`s.

```
Iterable<Semigroup<A>> -> Semigroup<A[]>
```

**Signature**

```ts
export declare const all: <A>(collection: Iterable<Semigroup<A>>) => Semigroup<A[]>
```

Added in v1.0.0

# constructors

## constant

**Signature**

```ts
export declare const constant: <A>(a: A) => Semigroup<A>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <A>(
  combine: (self: A, that: A) => A,
  combineMany?: (self: A, collection: Iterable<A>) => A
) => Semigroup<A>
```

Added in v1.0.0

## max

`Semigroup` that returns last maximum of elements.

**Signature**

```ts
export declare const max: <A>(O: Order<A>) => Semigroup<A>
```

Added in v1.0.0

## min

`Semigroup` that returns last minimum of elements.

**Signature**

```ts
export declare const min: <A>(O: Order<A>) => Semigroup<A>
```

Added in v1.0.0

# instances

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<SemigroupTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product_.Product<SemigroupTypeLambda>
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: semiProduct.SemiProduct<SemigroupTypeLambda>
```

Added in v1.0.0

## bigintMultiply

`bigint` semigroup under multiplication.

**Signature**

```ts
export declare const bigintMultiply: Semigroup<bigint>
```

Added in v1.0.0

## bigintSum

`bigint` semigroup under addition.

**Signature**

```ts
export declare const bigintSum: Semigroup<bigint>
```

Added in v1.0.0

## booleanAll

`boolean` semigroup under conjunction.

**Signature**

```ts
export declare const booleanAll: Semigroup<boolean>
```

Added in v1.0.0

## booleanAny

`boolean` semigroup under disjunction.

**Signature**

```ts
export declare const booleanAny: Semigroup<boolean>
```

Added in v1.0.0

## booleanEqv

`boolean` semigroup under equivalence.

**Signature**

```ts
export declare const booleanEqv: Semigroup<boolean>
```

Added in v1.0.0

## booleanXor

`boolean` semigroup under exclusive disjunction.

**Signature**

```ts
export declare const booleanXor: Semigroup<boolean>
```

Added in v1.0.0

## first

Always return the first argument.

**Signature**

```ts
export declare const first: <A = never>() => Semigroup<A>
```

Added in v1.0.0

## last

Always return the last argument.

**Signature**

```ts
export declare const last: <A = never>() => Semigroup<A>
```

Added in v1.0.0

## numberMultiply

`number` semigroup under multiplication.

**Signature**

```ts
export declare const numberMultiply: Semigroup<number>
```

Added in v1.0.0

## numberSum

`number` semigroup under addition.

**Signature**

```ts
export declare const numberSum: Semigroup<number>
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: Semigroup<string>
```

Added in v1.0.0

# type class

## Semigroup (interface)

**Signature**

```ts
export interface Semigroup<A> {
  readonly combine: (self: A, that: A) => A
  readonly combineMany: (self: A, collection: Iterable<A>) => A
}
```

Added in v1.0.0

# type lambdas

## SemigroupTypeLambda (interface)

**Signature**

```ts
export interface SemigroupTypeLambda extends TypeLambda {
  readonly type: Semigroup<this['Target']>
}
```

Added in v1.0.0

# utils

## imap

**Signature**

```ts
export declare const imap: {
  <A, B>(to: (a: A) => B, from: (b: B) => A): (self: Semigroup<A>) => Semigroup<B>
  <A, B>(self: Semigroup<A>, to: (a: A) => B, from: (b: B) => A): Semigroup<B>
}
```

Added in v1.0.0

## intercalate

**Signature**

```ts
export declare const intercalate: {
  <A>(separator: A): (S: Semigroup<A>) => Semigroup<A>
  <A>(S: Semigroup<A>, separator: A): Semigroup<A>
}
```

Added in v1.0.0

## reverse

The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.

**Signature**

```ts
export declare const reverse: <A>(S: Semigroup<A>) => Semigroup<A>
```

Added in v1.0.0
