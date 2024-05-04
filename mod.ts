/**
 * This module contains type utilities for checking type relationships.
 * @module
 */

/**
 * Check if the first type is assignable to the second type (Fst <: Snd)
 */
export type IsAssignable<Fst, Snd> = [Fst] extends [Snd]
  ? true
  : false;

/**
 * Check if the first type is a subtype of the second type (Fst <: Snd)
 */
export type IsSubtype<Fst, Snd> = IsAssignable<Fst, Snd> extends true ? true : false;

/**
 * Check if the first type is a supertype of the second type (Fst :> Snd)
 */
export type IsSupertype<Fst, Snd> = IsAssignable<Snd, Fst> extends true ? true : false;


/**
 * Check if two types are equivalent (Fst <: Snd and Fst :> Snd)
 */
export type IsEquivalent<Fst, Snd> = IsAssignable<Fst, Snd> extends true
  ? IsAssignable<Snd, Fst> extends true
    ? true
    : false
  : false;

/**
 * Check type compatibility
 */
type Compat<Fst, Snd> = IsEquivalent<Fst, Snd> extends true
  ? "Equivalent"     // Fst ≡ Snd
    : IsAssignable<Fst, Snd> extends true
    ? "Subtype"      // Fst <: Snd
      : IsAssignable<Snd, Fst> extends true
      ? "Supertype"  // Fst :> Snd
  : "Unrelated";     // Incomparable

/**
 * Check if two types are unrelated (Fst ⊥ Snd)
 */
export type IsUnrelated<Fst, Snd> = Compat<Fst, Snd> extends "Unrelated" ? true : false;

/**
 * Check if two types are identical (Fst ≡ Snd)
 *
 * source: {@link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650 GitHub}
 */
export type IsIdentical<Fst, Snd> =
  (<T>() => T extends Fst ? 1 : 2) extends
  (<T>() => T extends Snd ? 1 : 2)
    ? true
    : false;

/**
 * Check if two types are equal: Alias of Identical type
 */
export type Equals<Fst, Snd> = IsIdentical<Fst, Snd>;

/**
 * Check the relationship between two types
 */
export type Relation<Fst, Snd = Fst> =
  IsIdentical<Fst, Snd> extends true
  ? "Identical"
  : Compat<Fst, Snd>;

