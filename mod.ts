export type Assignable<Fst, Snd> = [Fst] extends [Snd]
  ? true
  : false;

export type Equivalent<Fst, Snd> = Assignable<Fst, Snd> extends true
  ? Assignable<Snd, Fst> extends true
    ? true
    : false
  : false;

export type Compat<Fst, Snd> = Equivalent<Fst, Snd> extends true
  ? "Equivalent"     // Fst ≡ Snd
    : Assignable<Fst, Snd> extends true
    ? "Subtype"      // Fst <: Snd
      : Assignable<Snd, Fst> extends true
      ? "Supertype"  // Fst :> Snd
  : "Unrelated";     // Incomparable

export type Identical<Fst, Snd> =
  (<T>() => T extends Fst ? 1 : 2) extends
  (<T>() => T extends Snd ? 1 : 2)
    ? true
    : false;

export type Equals<Fst, Snd> = Identical<Fst, Snd>;

/**
 * Check type relationships
 */
export type Relation<Fst, Snd = Fst> =
  Identical<Fst, Snd> extends true
  ? "Identical"
  : Compat<Fst, Snd>;

