import { serializeNdJson } from "./serialize.ts";

/**
 * Writes an array of serializable entities to a file according to the
 * ndjson format.
 * 
 * Optional 3rd argument is `Deno.WriteFileOptions` and is passed down to the
 * writer.
 * 
 * **Usage**
 * 
 * ```typescript
 * const toBeWritten = [
 *   { message: 'qui', level: 'info', timestamp: '2020-05-08T14:05:25.091Z' }, 
 *   { message: 'que', level: 'info', timestamp: '2020-05-08T14:05:25.096Z' },
 *   { message: 'quod', level: 'info', timestamp: '2020-05-08T14:05:25.104Z' },
 * ];
 * 
 * await readNdjson('file', toBeWritten, { append: true }); 
 * ```
 * @see https://github.com/ndjson/ndjson-spec
 */
export async function writeNdjson(
  filePath: string,
  data: unknown[],
  options?: Deno.WriteFileOptions,
): Promise<void> {
  await Deno.writeFile(
    filePath,
    new TextEncoder().encode(serializeNdJson(data)),
    options,
  );
}
