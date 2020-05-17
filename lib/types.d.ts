export type JSONData =
  | null
  | boolean
  | number
  | string
  | JSONData[]
  | { [prop: string]: JSONData };
