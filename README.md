# Type relation checker

This is simple utilities to check the type relations between two types in a TypeScript project.

- Check subtype (assignment) compatibility: `T1 <: T2`
- Check two types are identical (or equal): `T1 = T2`
- Check two types are equivalent: `T1 ≡ T2`
- Check two types are unrelated: `T1 ⊥ T2`
- Check two types are compatible (check above cases at once)

## Usage

```ts
import type {
  Relation,
  IsSubtype,
  IsSupertype,
  IsIdentical,
  IsEquivalent,
  IsUnrelated
} from "jsr:@yo-goto/type-relation-checker";

type _0 = Relation<number, string | number>; // => "Subtype"
type _1 = Relation<string | number, number>; // => "Supertype"
type _2 = Relation<number, number>; // => "Identical"
type _3 = Relation<Object, {}>; // => "Equivalent"
type _4 = Relation<"a", "b">; // => "Unrelated"

type _5 = IsSubtype<number, string | number>; // => true
type _6 = IsSupertype<string | number, number>; // => true
type _7 = IsIdentical<number, number>; // => true
type _8 = IsEquivalent<Object, {}>; // => true
type _9 = IsUnrelated<"a", "b">; // => true
```

