interface StrMap<T>{
  [key: string]: T;
}

const escapeMap: StrMap<string> = {
  "\0":   "\\0",
  "\x08": "\\b",
  "\x09": "\\t",
  "\x1a": "\\z",
  "\n":   "\\n",
  "\r":   "\\r",
  "\"":   "\\\"",
  "'":    "\\'",
  "\\":   "\\\\",
  "%":    "\\%",
};

export function escapeIdentifier<T>(x: string | T): string | T {
  if (typeof x === 'string') {
    // eslint-disable-next-line no-control-regex
    return (x as string).replace(/[\0\x08\x09\x1a\n\r"'\\%]/g, char => {
      const escaped: string = escapeMap[char];
      return escaped || char;
    })
  } else {
    return x;
  }
}

export function escapeArray(arr: Array<unknown>): Array<unknown> {
  return arr.map(escapeIdentifier)
}