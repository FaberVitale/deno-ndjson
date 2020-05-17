import { assertEquals } from "../dev_deps.ts";
import { serializeNdJson } from "../mod.ts";
import logExample, { serialized } from "../fixtures/log_example.ts";

Deno.test({
  name: "serializeNdJson: generic data",
  fn: () => {
    assertEquals(serializeNdJson(logExample), serialized);
  },
});
