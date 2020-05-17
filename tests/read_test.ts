import { assertEquals } from "../dev_deps.ts";
import { readNdjson } from "../mod.ts";
import logExample from "../fixtures/log_example.ts";

Deno.test({
  name: "readNdjson: reads empty file",
  fn: async () => {
    const expected: unknown[] = [];
    const output = await readNdjson("./fixtures/empty.ndjson");

    assertEquals(output, expected);
  },
});

Deno.test({
  name: "readNdjson: reads generic file",
  fn: async () => {
    const expected = logExample;
    const output = await readNdjson("./fixtures/log_example.ndjson");

    assertEquals(output, expected);
  },
});
