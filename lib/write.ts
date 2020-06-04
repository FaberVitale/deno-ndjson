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
 * import { writeNdjson } from 'https://deno.land/x/ndjson@1.0.1/mod.ts';
 * 
 * const toBeWritten = [
 *   { message: 'qui', level: 'info', timestamp: '2020-05-08T14:05:25.091Z' }, 
 *   { message: 'que', level: 'info', timestamp: '2020-05-08T14:05:25.096Z' },
 *   { message: 'quod', level: 'info', timestamp: '2020-05-08T14:05:25.104Z' },
 * ];
 * 
 * await writeNdjson('<file_path_here>', toBeWritten, { append: true }); 
 * ```
 * @see https://github.com/ndjson/ndjson-spec
 * @see https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#Deno.WriteFileOptions
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
