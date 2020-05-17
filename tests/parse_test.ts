import { assertEquals } from "../dev_deps.ts";
import { parseNdjson } from "../mod.ts";
import logExample from "../fixtures/log_example.ts";

Deno.test({
  name: "parseNdjson: parses empty file",
  fn: async () => {
    let file: Deno.File | null = null;
    const output: unknown[] = [];

    try {
      file = await Deno.open("./fixtures/empty.ndjson");

      for await (const parsed of parseNdjson(file)) {
        output.push(parsed);
      }
    } finally {
      file?.close();
    }

    assertEquals(output, []);
  },
});

Deno.test({
  name: "parseNdjson: parses generic file",
  fn: async () => {
    let file: Deno.File | null = null;
    const output: unknown[] = [];

    try {
      file = await Deno.open("./fixtures/log_example.ndjson");

      for await (const parsed of parseNdjson(file)) {
        output.push(parsed);
      }
    } finally {
      file?.close();
    }

    assertEquals(output, logExample);
}});