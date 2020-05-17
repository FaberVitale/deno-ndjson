/**
 * Serializes the content of an array to a sequence of json separated by 
 * new line characters.
 * @see https://github.com/ndjson/ndjson-spec
 */
export function serializeNdJson(data: unknown[]): string {
  const serializedList: string[] = [];

  for (let i = 0, len = data.length; i < len; i++) {
    serializedList.push(JSON.stringify(data[i]) + "\n");
  }

  return serializedList.join("");
}
