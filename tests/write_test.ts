import { assertEquals, path } from "../dev_deps.ts";
import logExample, { serialized } from "../fixtures/log_example.ts";
import { writeNdjson } from "../mod.ts";

const testFilePath = path.resolve(".", "fixtures/generated.test_file.ndjson");

Deno.test(
  {
    name: "writeNdjson: `Deno.WriteFileOptions`",
    fn: async () => {
      try {
        const expected = serialized + serialized;

        await writeNdjson(testFilePath, logExample);
        await writeNdjson(testFilePath, logExample, { append: true });

        const writtenContent = await Deno.readTextFile(testFilePath);

        assertEquals(writtenContent, expected);
      } finally {
        Deno.removeSync(testFilePath);
      }
    },
  },
);

Deno.test(
  {
    name: "writeNdjson: input Iterable",
    fn: async () => {
      try {
        const expected = serialized;

        await writeNdjson(testFilePath, new Set(logExample));

        const writtenContent = await Deno.readTextFile(testFilePath);

        assertEquals(writtenContent, expected);
      } finally {
        Deno.removeSync(testFilePath);
      }
    },
  },
);
