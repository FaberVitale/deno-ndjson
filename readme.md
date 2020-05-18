# deno-ndjson

## Decription

Read, write, parse and serialize newline delimited json, [aka NDJSON](https://github.com/ndjson/ndjson-spec).

## Usage

### parseNdjson

Parses the content of a [Deno.Reader](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#Deno.Reader).

Ignores parsing errors if options.strict is `false`.

```typescript
async function* parseNdjson<T extends JSONData>(
    reader: Deno.Reader,
    options?: { strict: boolean }
): AsyncIterableIterator<T>
```

#### example

```typescript
let file: Deno.File | null = null;

try {
  file = await Deno.open("<filepath_here>");
  
  for await (const parsed of readNdjson(file)) {
    console.log(parsed);
  }
} catch (readError) {
    // handle error
} finally {
    file?.close();
}
```

[source](./lib/parse.ts)

### readNdjson 

Reads a Ndjson file and returns an array of parsed lines.

```typescript
async function readNdjson<T extends JSONData[]>( filePath: string): Promise<T> 
```

#### example

```typescript
const parsed = await readNdjson("<file_path_here>");
```

[source](./lib/read.ts)

### serializeNdJson

Serializes the content of an array.

```typescript
function serializeNdJson(data: unknown[]): string
```

#### example

```typescript
const serialized: string = serializeNdJson([
  { who: "let" },
  { the: "dogs" },
  { out: "!" },
]);
```

Writes the content of an array to a file in ndjson format.

Optional third argument is [Deno.WriteFileOptions](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#Deno.WriteFileOptions)  and is passed down to the writer.

[source](./lib/serialize.ts)

```typescript
async function writeNdjson(
  filePath: string,
  data: unknown[],
  options?: Deno.WriteFileOptions,
): Promise<void>
```

#### example

```typescript
const toBeWritten = [
  { message: 'qui', level: 'info', timestamp: '2020-05-08T14:05:25.091Z' }, 
  { message: 'que', level: 'info', timestamp: '2020-05-08T14:05:25.096Z' },
  { message: 'quod', level: 'info', timestamp: '2020-05-08T14:05:25.104Z' },
];

await readNdjson('<file_path_here>', toBeWritten, { append: true }); 
```

[source](./lib/write.ts)

---

## License

[MIT](./LICENSE)