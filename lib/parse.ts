import { readLine } from "../deps.ts";
import { JSONData } from "./types.d.ts";

const readLineOptions = {
  separator: new Uint8Array([10]), //  `\n`, `\u000a`
};

/**
   * Given a `Deno.Reader` parses its content according to the `ndjson` format.
   * 
   * **Usage**
   * 
   * ```typescript
   * let file: Deno.File | null = null;
   * 
   * try {
   *   file = await Deno.open("<file_name_here>");
   *   
   *   for await (const parsed of readNdjson(file)) {
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
  const decoder = new TextDecoder();
  let count = 0;

  for await (const line of readLine(reader, readLineOptions)) {
    ++count;

    if (line.length) {
      const decoded = decoder.decode(line);

      try {
        yield JSON.parse(decoded);
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
