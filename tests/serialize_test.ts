import { assertEquals } from "../dev_deps.ts";
import { serializeNdJson } from "../mod.ts";
import logExample, {
  serialized,
  serializedMap,
} from "../fixtures/log_example.ts";

Deno.test({
  name: "serializeNdJson: generic array",
  fn: () => {
    assertEquals(serializeNdJson(logExample), serialized);
  },
});

Deno.test({
  name: "serializeNdJson: Set",
  fn: () => {
    assertEquals(serializeNdJson(new Set(logExample)), serialized);
  },
});

Deno.test({
  name: "serializeNdJson: Map",
  fn: () => {
    assertEquals(
      serializeNdJson(new Map(logExample.map((val, idx) => [idx, val]))),
      serializedMap,
    );
  },
});
