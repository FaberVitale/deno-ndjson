import { assertEquals, io } from "../dev_deps.ts";
import { parseNdjson } from "../mod.ts";
import logExample, { serialized } from "../fixtures/log_example.ts";

Deno.test({
  name: "parseNdjson: empty file",
  fn: async () => {
    const output: unknown[] = [];
    const stringReader = new io.StringReader("");

    for await (const parsed of parseNdjson(stringReader)) {
      output.push(parsed);
    }
    assertEquals(output, []);
  },
});

Deno.test({
  name: "parseNdjson: generic data",
  fn: async () => {
    const output: unknown[] = [];
    const stringReader = new io.StringReader(serialized);

    for await (const parsed of parseNdjson(stringReader)) {
      output.push(parsed);
    }

    assertEquals(output, logExample);
  },
});

Deno.test({
  name: "parseNdjson: handles `\r\n`",
  fn: async () => {
    const output: unknown[] = [];
    const winStyleWithEmptyLines = "\r\n" + serialized.replace(/\n/g, "\r\n") +
      "\r\n";
    const stringReader = new io.StringReader(winStyleWithEmptyLines);

    for await (const parsed of parseNdjson(stringReader)) {
      output.push(parsed);
    }

    assertEquals(output, logExample);
  },
});

Deno.test({
  name: "parseNdjson: `{ strict: false }`",
  fn: async () => {
    const output: unknown[] = [];
    const withInvalidLines = "{{\r\n" + serialized + "[\r\n";
    const stringReader = new io.StringReader(withInvalidLines);

    for await (const parsed of parseNdjson(stringReader, { strict: false })) {
      output.push(parsed);
    }

    assertEquals(output, logExample);
  },
});
