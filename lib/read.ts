import type { JSONData } from "./types.d.ts";
import { parseNdjson } from "./parse.ts";

/**
 * Reads a ndjson file and returns a promise that resolves to its content
 * parsed inside an array.
 *
 * **Usage**
 *
 * ```typescript
 * import { readNdjson } from 'https://deno.land/x/ndjson@1.1.0/mod.ts';
 *
 * const parsed = await readNdjson("<filePath_here>");
 * ```
 * @see https://github.com/ndjson/ndjson-spec
 */
export async function readNdjson<T extends JSONData[]>(
  filePath: string,
): Promise<T> {
  const output = [] as unknown as T;
  const file = await Deno.open(filePath);

  try {
    for await (const parsed of parseNdjson(file)) {
      output.push(parsed);
    }
  } catch (readError) {
    readError.message = `${filePath}: ${readError.message}`;

    throw readError;
  } finally {
    file.close();
  }

  return output;
}
