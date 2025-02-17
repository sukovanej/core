<h3 align="center">
  <a href="https://fp-ts.github.io/core/">
    <img src="./docs/fp-ts-logo.png">
  </a>
</h3>

<p align="center">
Functional programming in TypeScript
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fp-ts/core">
    <img src="https://img.shields.io/npm/dm/@fp-ts/core.svg" alt="npm downloads" height="20">
  </a>
</p>

# Credits and sponsorship

This library was inspired by the following projects:

- [fp-ts](https://github.com/gcanti/fp-ts)

A huge thanks to my sponsors who made the development of `@fp-ts/core` possible.

If you also want to **become a sponsor** to ensure this library continues to improve and receive maintenance, check out my [GitHub Sponsors profile](https://github.com/sponsors/gcanti?o=sd&sc=t)

## Requirements

- TypeScript 4.8 or newer
- The `strict` flag enabled in your `tsconfig.json` file

```
{
  // ...
  "compilerOptions": {
    // ...
    "strict": true,
  }
}
```

# Typed functional programming in TypeScript

This project represents the next major iteration of [`fp-ts`](https://github.com/gcanti/fp-ts) and it's objective is a reconciliation with [`@effect`](https://github.com/Effect-TS) in order to unify the ecosystems.

The [`@effect`](https://github.com/Effect-TS) project will reduce it's scope to simply being an effect system and will delegate to `fp-ts org` all the lower level abstractions such as typeclasses and common data structures.

The objective of the `fp-ts org` in github and in npm (`@fp-ts`) is to simplify structure and management of the project, have smaller and better scoped packages.

Our "current" idea (that is well open for changes) is for `fp-ts org` to have:

- The [`@fp-ts/core`](https://github.com/fp-ts/core) library features a new implementation of the Higher Kinded Type (HKT) pattern, including common typeclasses such as `Monad` and widely-used data types like `Option`, `Either`, and `ReadonlyArray`
- [`@fp-ts/schema`](https://github.com/fp-ts/schema) offers schema validation with static type inference, including decoders for data structures in `@fp-ts/core` and `@effect/data`
- [`@fp-ts/optic`](https://github.com/fp-ts/optic) provides optics for structures in both `@fp-ts/core` and `@effect/data`

For those using [`fp-ts`](https://github.com/gcanti/fp-ts) v2 and its ecosystem, roughly these are the equivalents:

- [`fp-ts`](https://github.com/gcanti/fp-ts) -> [`@fp-ts/core`](https://github.com/fp-ts/core) + [`@effect/*` packages](https://github.com/Effect-TS)
- [`io-ts`](https://github.com/gcanti/io-ts) -> [`@fp-ts/schema`](https://github.com/fp-ts/schema)
- [`monocle-ts`](https://github.com/gcanti/monocle-ts) -> [`@fp-ts/optic`](https://github.com/fp-ts/optic)

Note that `@fp-ts/core` will not contain any effect system (e.g. `Task`, `TaskEither`, `ReaderTaskEither`) since the handling of effects is entirely delegated to the packages contained in [`@effect/*`](https://github.com/Effect-TS).

# Installation

To install the **alpha** version:

```
npm install @fp-ts/core
```

**Warning**. This package is primarily published to receive early feedback and for contributors, during this development phase we cannot guarantee the stability of the APIs, consider each release to contain breaking changes.

# Documentation

- Guides (WIP)
  - [Typeclass overview](./guides/typeclass.md)
  - [Standard TypeScript types](./guides/ts-types.md)
  - Data types
    - [`Option`](./guides/Option.md)
- [API Reference](https://fp-ts.github.io/core/)

# License

The MIT License (MIT)
