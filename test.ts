import type { Relation, IsIdentical } from "./mod.ts";
import {
  assert,
  type IsExact,
} from "https://deno.land/x/conditional_type_checks@1.0.6/mod.ts";

Deno.test("Identical type", () => {
  assert<IsExact<IsIdentical<"a", "b">, false>>(true);
  assert<IsExact<IsIdentical<"a", "a">, true>>(true);
  assert<IsExact<IsIdentical<true, boolean>, false>>(true);
  assert<IsExact<IsIdentical<boolean, false>, false>>(true);
  // deno-lint-ignore ban-types
  assert<IsExact<IsIdentical<Object, {}>, false>>(true);
});

Deno.test("Relation type", () => {
  assert<IsExact<Relation<"a", "b">, "Unrelated">>(true);
  assert<IsExact<Relation<"a", "a">, "Identical">>(true);
  assert<IsExact<Relation<true, boolean>, "Subtype">>(true);
  assert<IsExact<Relation<boolean, false>, "Supertype">>(true);
  assert<IsExact<Relation<boolean, false>, "Supertype">>(true);
  // deno-lint-ignore ban-types
  assert<IsExact<Relation<Object, {}>, "Equivalent">>(true);
});

