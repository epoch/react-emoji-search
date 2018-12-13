
export function pluralize(wordSingular, wordPlural, num) {
  return num === 1 ? wordSingular : wordPlural
}

export function parseUnicodes(codes) {
  return codes.split(' ').map(code => `&#${parseInt(code, 16)};`).join('')
}
