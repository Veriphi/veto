type Printable = boolean | string | number | undefined | null | Printable[]

/**
 * Template function taken from https://damonpl.dev/blog/misc/lean-templating.html
 * Like react does in with jsx, it automatically convert falsy template variable to empty string
 */
export default function emptyFalsy(strings: TemplateStringsArray, ...values: Printable[]): string {
  let acc = ''
  for (let i = 0; i < strings.length; i++) {
    acc += strings[i]

    if (Array.isArray(values[i])) {
      acc += (values[i] as Printable[])
        .map((j) => j ?? '') // default to ''
        .map((j) => (j === false ? '' : j)) // false to ''
        .join('')
    } else {
      const value = values[i] ?? '' // default to ''
      acc += value === false ? '' : value // false to ''
    }
  }

  return acc
}
