import type { JSONData } from "./types.d.ts";
import { readLines } from "../deps.ts";

/**
 * Given a `Deno.Reader` parses its content according to the `ndjson` format.
 *
 * If `options.strict` is `false` parsing errors are ignored,
 * defaults to `true`.
 *
 * **Usage**
 *
 * ```typescript
 * import { parseNdjson } from 'https://deno.land/x/ndjson@v1.1.0/mod.ts';
 *
 * let file: Deno.File | null = null;
 *
 * try {
 *   file = await Deno.open("<file_name_here>");
 *
 *   for await (const parsed of parseNdjson(file)) {
 *     console.log(parsed);
 *   }
 * } catch (readError) {
 *     // handle error
 * } finally {
 *     file?.close();
 * }
 *  ```
 * @see https://github.com/ndjson/ndjson-spec
 */
export async function* parseNdjson<T extends JSONData>(
  reader: Deno.Reader,
  options?: { strict: boolean },
): AsyncIterableIterator<T> {
  const strict = options?.strict ?? true;
  let count = 0;

  for await (const line of readLines(reader)) {
    ++count;

    if (line.length && line !== "\r") {
      try {
        yield JSON.parse(line);
      } catch (parsingError) {
        if (strict) {
          parsingError.message =
            `error at line ${count}, ${parsingError.message}`;

          throw parsingError;
        }
      }
    }
  }
}
