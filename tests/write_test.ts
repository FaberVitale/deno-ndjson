import { assertEquals, path } from "../dev_deps.ts";
import log_example, { serialized } from "../fixtures/log_example.ts";
import { writeNdjson } from "../mod.ts";

const testFilePath = path.resolve("./", "fixtures/test_file.ndjson");

Deno.test(
  {
    name: "writeNdjson: supports `Deno.WriteFileOptions`",
    fn: async () => {
      try {
        const expected = serialized + serialized;

        await writeNdjson(testFilePath, log_example);
        await writeNdjson(testFilePath, log_example, { append: true });

        const writtenContent = await Deno.readTextFile(testFilePath);

        assertEquals(writtenContent, expected);
      } finally {
        Deno.removeSync(testFilePath);
      }
    },
  },
);
