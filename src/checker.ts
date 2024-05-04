/**
 * Check if the first type is assignable to the second type (Fst <: Snd)
 */
export type Assignable<Fst, Snd> = [Fst] extends [Snd]
  ? true
  : false;

/**
 * Check if two types are equivalent (Fst <: Snd and Fst :> Snd)
 */
export type Equivalent<Fst, Snd> = Assignable<Fst, Snd> extends true
  ? Assignable<Snd, Fst> extends true
    ? true
    : false
  : false;

/**
 * Check type compatibility
 */
export type Compat<Fst, Snd> = Equivalent<Fst, Snd> extends true
  ? "Equivalent"     // Fst ≡ Snd
    : Assignable<Fst, Snd> extends true
    ? "Subtype"      // Fst <: Snd
      : Assignable<Snd, Fst> extends true
      ? "Supertype"  // Fst :> Snd
  : "Unrelated";     // Incomparable

/**
 * Check if two types are identical (Fst ≡ Snd)
 *
 * source: {@link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650 GitHub}
 */
export type Identical<Fst, Snd> =
  (<T>() => T extends Fst ? 1 : 2) extends
  (<T>() => T extends Snd ? 1 : 2)
    ? true
    : false;

/**
 * Check if two types are equal: Alias of Identical type
 */
export type Equals<Fst, Snd> = Identical<Fst, Snd>;

/**
 * Check the relationship between two types
 */
export type Relation<Fst, Snd = Fst> =
  Identical<Fst, Snd> extends true
  ? "Identical"
  : Compat<Fst, Snd>;
