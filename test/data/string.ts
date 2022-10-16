import * as monoid from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"
import type * as show from "@fp-ts/core/Show"
import type * as sortable from "@fp-ts/core/Sortable"

export const Semigroup: semigroup.Semigroup<string> = semigroup.fromCombine((s1, s2) => s1 + s2)

export const Monoid: monoid.Monoid<string> = monoid.fromSemigroup(Semigroup, "")

export const Show: show.Show<string> = {
  show: (s) => JSON.stringify(s)
}

export const Sortable: sortable.Sortable<string> = {
  compare: (s1, s2) => s1 < s2 ? -1 : s1 > s2 ? 1 : 0
}
