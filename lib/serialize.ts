/**
 * Serializes the content of an array or an iterable 
 * to a sequence of json separated by new line characters.
 * @see https://github.com/ndjson/ndjson-spec
 */
export function serializeNdJson(data: Iterable<unknown>): string;
export function serializeNdJson(data: unknown[]): string;
export function serializeNdJson(data: unknown[] | Iterable<unknown>): string {
  const serializedList: string[] = [];

  if (Array.isArray(data)) {
    for (let i = 0, len = data.length; i < len; i++) {
      serializedList.push(JSON.stringify(data[i]) + "\n");
    }

    return serializedList.join("");
  } else {
    for (const item of data) {
      serializedList.push(JSON.stringify(item) + "\n");
    }
  }

  return serializedList.join("");
}
